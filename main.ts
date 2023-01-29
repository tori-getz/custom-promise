import { CustomPromise } from './custom-promise';

const promiseTimeout = new CustomPromise((resolve, reject) => {
  resolve('jhahah')
  // setTimeout(() => {
  //   resolve('resolved');

  //   reject(new Error('rejected'));
  // }, 1000);
});

promiseTimeout
  .then<string>(data => {
    console.log(data);
    
    throw new Error('rejected in then');
  })
  .catch<Error>(err => console.error(err.message ?? err));
