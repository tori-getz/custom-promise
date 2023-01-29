export type ResolveFn<T = any> = (data: T) => any;
export type RejectFn<T = any> = (error: T) => any;

export type CustomPromiseCallback = (resolve: ResolveFn, reject: RejectFn) => any;

export enum PromiseStatus {
  pending,
  fullfiled,
  rejected
}
