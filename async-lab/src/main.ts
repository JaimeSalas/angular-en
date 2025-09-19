import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";

import { myTimeoutPromise } from "./async-service.ts";

function sync(argument: string) {
  console.log(argument);
}

// (() => {
//   sync("1"); // Blocking code
//   myTimeout(() => console.log("2"));
//   sync("3");
// })();

// const promiseMyTimeout = (argument: string) => {
//   return new Promise((res, rej) => {
//     myTimeout(() => res(() => console.log(argument)));
//     rej();
//   });
// };

// (() => {
//   sync("1"); // Blocking code

//   promiseMyTimeout("2")
//     // @ts-ignore
//     .then((f) => f())
//     .then(() => sync("3"))
//     .catch(console.error);
// })();

// (() => {
//   myTimeoutPromise("1")
//     .then((r) => {
//       console.log(r);
//       return myTimeoutPromise("2", 'Muahhahahahaha');
//     })
//     .then((r) => {
//       console.log(r);
//       return myTimeoutPromise("3");
//     })
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => console.log("complete"));

//   Promise.all([myTimeoutPromise("4"), myTimeoutPromise("5")]).then((c) => {
//     console.log(c);
//   });
// })();

(async () => {
  try {
    // const result1 = await myTimeoutPromise("1");
    // console.log(result1);
    // const result2 = await myTimeoutPromise("2");
    // console.log(result2);
    // const result3 = await myTimeoutPromise("3", "Muhahahhaha");
    // console.log(result3);
    const [_, second] = await Promise.all([
      myTimeoutPromise("1"),
      myTimeoutPromise("2"),
    ]);
    console.log(second);

  } catch (error) {
    console.error(error);
  } finally {
    console.log("completed");
  }
})();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);

//
