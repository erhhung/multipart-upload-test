#!/bin/sh
':' //; exec /usr/local/bin/node --max-old-space-size=4096 --expose-gc -r esm "$0" "$@"
/*
 * usage: ./index.js [filename]
 *
 * run this script as executable!
 * change settings in settings.js
 */

import path       from 'path';
import crypto     from 'crypto';
import request    from 'request-promise';
import settings   from './settings';
import FileHelper from './filehelper';
import AwsHelper  from './awshelper';
import TaskPool   from './taskpool';
import Progress   from './progress';
import Upload     from './upload';

const FILE_NAME   = settings.fileName;
const FILE_PATH   = path.join(__dirname, FILE_NAME);
const PART_SIZE   = settings.partSize;
const CONCURRENCY = settings.concurrency;

const BAR = '-------------';
const pad = str => str.padStart(BAR.length);

const unquote = str => str.replace(/^(["'])(?<str>.*?)\1$/, '$<str>');
const partMD5 = buf => crypto.createHash('md5').update(buf).digest('hex');
const objETag = etags => `"${partMD5(Buffer.from(etags.map(unquote).join(''), 'hex'))}-${etags.length}"`;

// file helper reads parts
const file = new FileHelper(PART_SIZE);
await file.open(FILE_PATH);
const {size, parts} = file;

console.log(pad('File Size:'), size);
console.log(pad('Part Size:'), PART_SIZE);
console.log(pad('Total Parts:'), parts);

// change profile name and region to any desired
// (profile is one defined in ~/.aws/credentials)
const aws = new AwsHelper(settings.aws.profile,
                          settings.aws.region);

const opts = {
  bucket: settings.aws.bucket,
  key:    settings.aws.prefix + path.basename(FILE_NAME),
};
opts.upId = await aws.createMultipartUpload(opts);
console.log(pad('Upload ID:'), opts.upId);

/**
 * parts generator function
 * @param {boolean} asStream
 */
async function* partsGen(asStream = false) {
  for (let part = 1; part <= parts; part++) {
    const num = part;
    const [url, body] = await Promise.all([
      /*
       * get presigned URL and read
       * file data at the same time
       */
      aws.getPresignedUploadPartUrl({...opts, part}),
      asStream && file.getPartAsStream(num)
               || file.getPartAsBuffer(num),
    ]);
    const md5  = asStream || partMD5(body);
    const size = file.getPartSize(num);
    yield {num, url, body, size, md5};
  }
}

const prog = new Progress();
try {
  const {config} = Upload;
  const etags = [];

  // TEST 1: upload parts sequentially using buffers
  for await (const {num, url, body, md5} of partsGen()) {
    console.log(BAR);
    console.log('%s "%s"', pad(`Part ${num}  URL:`), url);

    console.log('Sending %i bytes...', body.byteLength);
    const res = await request({...config, url, body});

    const {etag} = res.headers;
    etags.push(etag);

    console.log('%s "%s"', pad(`Part ${num}  MD5:`), md5);
    console.log(pad(`Part ${num} ETag:`), etag); // quoted
  }
  console.error(BAR);

  const partsIter = partsGen(true);
  const tasks = [];

  // TEST 2: upload parts in parallel using streams
  for (let i = 0; i < parts; i++) {
    tasks.push(async () => {
      const {value: part} = await partsIter.next();
      const upload = new Upload(part, parts, prog);

      const {etag} = await upload.start();
      if (etag !== etags[part.num - 1]) {
        throw new Error(`bad ETag: ${etag}`);
      }
    });
  }

  const pool = new TaskPool(CONCURRENCY);
  // enqueue() waits until all parts sent
  await pool.enqueue(tasks);
  prog.stop();

  const etag = await aws.completeMultipartUpload({...opts, etags});

  console.log(BAR);
  console.log(pad('My ETag:'), objETag(etags));
  console.log(pad('S3 ETag:'), etag);
}
catch (err) {
  prog.stop();

  console.error('ERROR:', err.message);
  await aws.abortMultipartUpload(opts);
}
finally {
  file.close();
}

process.exit();
