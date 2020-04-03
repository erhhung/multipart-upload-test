import AWS        from 'aws-sdk';
import ProxyAgent from 'proxy-agent';

AWS.config.apiVersions = {
  s3: '2006-03-01',
};

const {https_proxy} = process.env;
if (https_proxy) {
  const agent = new ProxyAgent(https_proxy);
  AWS.config.update({httpOptions: {agent}});
}

export default class AwsHelper {
  /**
   * @param {string} profile  credentials profile name
   * @param {string} [region] override profile default
   */
  constructor(profile, region) {
    // load credentials from "~/.aws/credentials"
    const credentials = new AWS.SharedIniFileCredentials({profile});
    // ensure using signature v4 (AWS4-HMAC-SHA256)
    const opts = {credentials, region, signatureVersion: 'v4'};

    // construct service interface
    this._s3 = new AWS.S3(opts);
  }

  /**
   * initiate a multipart upload
   * @param {object} opts {bucket,key}
   * @returns {Promise<string>} upload ID
   */
  async createMultipartUpload(opts) {
    const params = {
      Bucket: opts.bucket,
      Key:    opts.key,
    };
    const res = await this._s3.createMultipartUpload(params).promise();
    return res.UploadId;
  }

  /**
   * get presigned URL for putObject
   * @param {object} opts {bucket,key}
   * @returns {Promise<string>}
   */
  async getPresignedPutObjectUrl(opts) {
    const params = {
      Bucket:  opts.bucket,
      Key:     opts.key,
      Expires: 60*60,
    };
    return this._s3.getSignedUrlPromise('putObject', params);
  }

  /**
   * get presigned URL for multipart uploadPart
   * @param {object} opts {bucket,key,upId,part}
   * @returns {Promise<string>}
   */
  async getPresignedUploadPartUrl(opts) {
    const params = {
      Bucket:     opts.bucket,
      Key:        opts.key,
      UploadId:   opts.upId,
      PartNumber: opts.part,
      Expires:    60*60,
    };
    return this._s3.getSignedUrlPromise('uploadPart', params);
  }

  /**
   * finish multipart upload by combining uploaded parts
   * @param {object} opts {bucket,key,upId,etags["MD5"]}
   * @returns {Promise<string>} object ETag
   */
  async completeMultipartUpload(opts) {
    const params = {
      Bucket:   opts.bucket,
      Key:      opts.key,
      UploadId: opts.upId,
      MultipartUpload: {
        Parts: opts.etags.map((etag, i) => ({ETag: etag, PartNumber: i+1})),
      },
    };
    const res = await this._s3.completeMultipartUpload(params).promise();
    return res.ETag;
  }

  /**
   * abort an incomplete multipart upload
   * @param {object} opts {bucket,key,upId}
   * @returns {Promise}
   */
  async abortMultipartUpload(opts) {
    const params = {
      Bucket:   opts.bucket,
      Key:      opts.key,
      UploadId: opts.upId,
    };
    return this._s3.abortMultipartUpload(params).promise();
  }
}
