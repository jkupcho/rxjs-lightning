import { Observable } from "rxjs";

let output = document.getElementById("content");
let scaryOutput = document.getElementById("scary-words");

let arrayObservable = Observable.from([1, 2, 3, 'boo', 'RAWR!']);

let listObservable = arrayObservable
  .filter(value => !isNaN(+value))
  .map(value => `Number: ${value}`)
  .scan((acc, value) => {
    const li = document.createElement("li");
    li.innerText = value;
    acc.appendChild(li);
    return acc;
  }, document.createElement("ol"));

let stringObservable = arrayObservable
  .filter(value => isNaN(+value))
  .map(value => `${value} is a scary word!`)
  .scan((acc, value) => {
    const paragraph = document.createElement("p");
    paragraph.innerText = value;
    acc.appendChild(paragraph);
    return acc;
  }, document.createElement("div"));

listObservable.subscribe(
  value => {
    output.appendChild(value);
  },
  err => console.error(`An error occurred: ${err}`),
  () => console.log('Completed!')
);

stringObservable.subscribe(
  value => scaryOutput.appendChild(value)
);