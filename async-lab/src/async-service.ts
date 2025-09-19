/*
- Timers
- Events
- Operation
    - Http - fetch, XMLHtttRequest
- Sequential
- Parallel
*/

export function myTimeout(callback: Function) {
  setTimeout(() => {
    callback();
  }, 500);
}

export function myTimeoutPromise(arg: string, err?: string) {
  return new Promise((res, rej) => {
    if (err) {
      rej(err);
    }
    setTimeout(() => {
      res(arg);
    }, 500);
  });
}

// function * gen() {
//     yield myTimeoutPromise()
// }
