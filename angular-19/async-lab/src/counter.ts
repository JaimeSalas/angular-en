const callbackClick1 = () => {
  console.log("callbackclick1");
};

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };

  element.addEventListener("click", callbackClick1);
  element.addEventListener("click", () => {
    console.log("callbackclick2");
    setCounter(counter + 1);
  }); // Event Listener
  setCounter(0);
}
