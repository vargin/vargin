export class PromiseQueue {
  private queue: Promise<any>;

  enqueue(callback) {
    if (!this.queue) {
      this.queue = Promise.resolve();
    }

    return this.queue = this.queue.then(callback);
  }
}