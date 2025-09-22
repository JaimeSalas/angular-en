import { Observable } from 'rxjs';
// map

/*
------1-----2------3-----|>

    x => x * 2

------2-----4------6-----|>
*/

// new Observable((observer) => {
//     observer.
// })

// pipe(myMap(() => ()))

export function myMap(fn: any) {
  
  // @ts-ignore
  return (input) =>
    new Observable((observer) => {
      return input.subscribe({
        next: (value: any) => observer.next(fn(value)),
        error: (err: any) => observer.error(err),
        complete: () => observer.complete(),
      });
    });
}
