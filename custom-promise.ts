import {
  CustomPromiseCallback,
  ResolveFn,
  RejectFn,
  PromiseStatus
} from "./types";

export class CustomPromise {
  private status: PromiseStatus;

  private thenFn: ResolveFn = () => {};
  private catchFn: RejectFn = () => {};

  public constructor(callback: CustomPromiseCallback) {
    this.status = PromiseStatus.pending;

    return callback(
      this.resolve.bind(this),
      this.reject.bind(this),
    );
  }

  private resolve<T = any>(data: T) {
    if (this.status !== PromiseStatus.pending) return;

    queueMicrotask(() => {
      try {
        this.status = PromiseStatus.fullfiled;
        this.thenFn(data);
      } catch (e) {
        this.status = PromiseStatus.rejected;
        
        if (!this.catchFn) {
          throw e;
        }

        this.catchFn(e);
      }
    });
  }

  private reject<T = any>(error: T) {
    if (this.status !== PromiseStatus.pending) return;

    this.status = PromiseStatus.rejected;

    return this.catchFn(error);
  }

  public then<T = any, E = any>(
    onResolved?: ResolveFn<T>,
    onRejected?: RejectFn<E>
  ) {
    if (onResolved) {
      this.thenFn = onResolved;
    }

    if (onRejected) {
      this.catchFn = onRejected;
    }

    return this;
  }

  public catch<T = any>(onRejected: RejectFn<T>) {
    return this.then(undefined, onRejected);
  }
}
