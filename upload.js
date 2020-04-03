import crypto  from 'crypto';
import request from 'request';

const OPTS = {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/octet-stream',
  },
  resolveWithFullResponse: true, // get headers
};

export default class Upload {
  /**
   * body:ReadStream
   * @param {object} part {num,url,body,size}
   * @param {number} parts total # of parts
   * @param {Progress} prog progress bars
   */
  constructor(part, parts, prog) {
    const str = `${parts}`;
    const num = `${part.num}`.padStart(str.length);

    this._part = part;
    this._prog = prog;
    this._bar  = prog.reserveBar({
      name: `Part ${num}/${str}`,
      total: part.size,
    });
  }

  /**
   * start upload; resolves when complete
   * @returns {Promise<object>} {md5,etag}
   */
  async start() {
    return new Promise((resolve, reject) => {
      const {url, body, size} = this._part;
      const hash = crypto.createHash('md5');

      let bytes = 0;
      body.on('data', buf => {
        hash.update(buf);

        bytes += buf.byteLength;
        // the update frequency is dictated by
        // the ReadStream highWaterMark option
        this._prog.updateBar(this._bar, bytes);
      });

      request({...OPTS,
        headers: {...OPTS.headers,
          'Content-Length': size,
        },
        url, body,
      }).on('error',    reject)
        .on('response', res => {
          this._prog.releaseBar(this._bar);

          resolve({
            md5:  hash.digest('hex'),
            etag: res.headers.etag,
          });
        });
    });
  }

  /**
   * request config
   */
  static get config() {
    return OPTS;
  }
}
