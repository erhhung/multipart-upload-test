import fs, { promises as fsp } from 'fs';

const OPTS = {
  highWaterMark: 1024*8,
  autoClose:     true,
  emitClose:     true,
};

export default class FileHelper {
  /**
   * @param {number} partSize
   */
  constructor(partSize) {
    if (partSize < 1) {
      throw new Error('partSize must be >= 1');
    }
    this._pSize = partSize;
  }

  /**
   * open binary file to read
   * @param {string} pathname
   * @returns {Promise<FileHelper>}
   */
  async open(pathname) {
    this._handle = await fsp.open(pathname);
    this._fSize = (await this._handle.stat()).size;
    this._path = pathname;
    return this;
  }

  /**
   * size of opened file
   * @returns {number}
   */
  get size() {
    return this._fSize;
  }

  /**
   * total # of parts
   * @returns {number}
   */
  get parts() {
    if (!this._parts) {
      const parts = Math.floor(this._fSize / this._pSize);
      this._parts = Math.sign(this._fSize - this._pSize * parts) + parts;
    }
    return this._parts;
  }

  /**
   * get the size of part #
   * @param {number} partNo
   * @returns {number}
   */
  getPartSize(partNo) {
    return this._getBounds(partNo).length;
  }

  /**
   * get part {offset,length}
   * @param {number} partNo
   * @returns {object}
   */
  _getBounds(partNo) {
    if (!this._handle) {
      throw new Error('file not opened yet');
    }
    const offset = (partNo - 1) * this._pSize;
    if (offset < 0 || offset >= this._fSize) {
      throw new Error('invalid part number');
    }
    const length = Math.min(partNo * this._pSize, this._fSize) - offset;
    return {offset, length};
  }

  /**
   * read bytes for part #
   * @param {number} partNo
   * @returns {Promise<Buffer>}
   */
  async getPartAsBuffer(partNo) {
    const {offset, length} = this._getBounds(partNo);
    const buffer = Buffer.allocUnsafe(length);

    return (await this._handle.read(buffer, 0, length, offset)).buffer;
  }

  /**
   * read bytes for part #
   * @param {number} partNo
   * @returns {ReadStream}
   */
  getPartAsStream(partNo) {
    const {offset, length} = this._getBounds(partNo);
    const opts = {...OPTS,
      start: offset,
      end:   offset + length - 1,
    }
    return fs.createReadStream(this._path, opts);
  }

  /**
   * close opened file handle
   * @returns {Promise} closed
   */
  async close() {
    if (this._handle) {
      await  this._handle.close();
      delete this._handle;
    }
  }
}
