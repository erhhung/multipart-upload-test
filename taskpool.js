export default class TaskPool {
  /**
   * @param {number} concurrency max # of concurrent tasks
   */
  constructor(concurrency = 4) {
    this._concur = concurrency;
  }

  /**
   * enqueue async tasks to run with bounded concurrency
   * @param {async function[]} tasks async task functions
   * @returns {Promise} resolved when all tasks are done
   */
  async enqueue(tasks) {
    const queue = [...tasks.reverse()];
    const pool  = [];

    do {
      // fill promise pool with running concurrent tasks
      while (queue.length && pool.length < this._concur) {

        let p = async () => {
          const task = queue.pop();
          // task error here will
          // halt the entire pool
          await task();
        };
        // mark the promise done after each task
        p = p().finally(() => { p.done = true });
        pool.push(p);
      }

      if (queue.length) {
        // free pool slot after
        // a task has completed
        await Promise.race(pool);

        for (let i = 0; i < pool.length; i++) {
          pool[i].done && pool.splice(i--, 1);
        }
      }
    } while (queue.length);

    // wait for last batch
    await Promise.all(pool);
  }
}
