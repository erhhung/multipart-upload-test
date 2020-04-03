const [,, file] = process.argv;

export default {
  aws: {
    // ~/.aws/credentials profile name to
    // obtain access key ID and secret key
    profile: 'default',
    // region where S3 bucket is located
    region: 'us-west-1',
    // name of S3 bucket to upload to
    bucket: 'test-bucket',
    // key prefix of uploaded files
    prefix: 'uploads/',
  },
  // file to upload relative to __dirname
  fileName: file || './large-file.zip',
  // multipart upload part size in bytes
  partSize: 1024*1024*10,
  // upload concurrency: will increase memory
  // usage to at least n * part size buffers
  concurrency: 5,
};
