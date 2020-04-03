import cliProgress from 'cli-progress';

const OPTS = {
  format: '{name} [{bar}] {percentage}% | bytes: {value}',
  barCompleteChar:   '▓',
  barIncompleteChar: '░',
  autopadding:       true,
  hideCursor:        true,
};
const NAME_WIDTH = 10;

export default class Progress {
  constructor() {
    this._prog = new cliProgress.MultiBar(OPTS);
    this._bars = []; // {used,bar,total,payload}
  }

  /**
   * reserve a progress bar
   * @param {object} opts {name,total}
   * @returns {number} handle
   */
  reserveBar(opts) {
    const {name, total} = opts;
    const payload = {
      name: name.slice(-NAME_WIDTH).padEnd(NAME_WIDTH),
    };
    const args = [total, 0, payload];
    let bar;

    let i = this._bars.findIndex(bar => !bar.used);
    if (i >= 0) {
      bar = this._bars[i];
      bar.bar.start(...args);
    } else {
      bar = {bar: this._prog.create(...args)};
      i = this._bars.push(bar) - 1;
      if (!bar.bar) {
        throw new Error('cannot create progress bar');
      }
    }

    bar.used    = true;
    bar.total   = total;
    bar.payload = payload;
    return i;
  }

  /**
   * update a bar's progress
   * (relative to its total)
   * @param {number} handle
   * @param {number} value
   */
  updateBar(handle, value) {
    this._updateBar(...arguments);
  }

  _updateBar(handle, value = Infinity) {
    const bar = this._bars[handle];
    if (!bar) {
      return false;
    }
    value = Math.min(value, bar.total);
    bar.bar.update(value, bar.payload);
    return true;
  }

  /**
   * set progress to 100%
   * and release it usage
   * @param {number} handle
   */
  releaseBar(handle) {
    if (!this._updateBar(handle)) {
      return;
    }
    const bar = this._bars[handle];
    bar.used = false;
    bar.bar.stop();
  }

  /**
   * stop progress bars
   */
  stop() {
    this._prog.stop();
  }
}
