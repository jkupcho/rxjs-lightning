import { Observable } from "rxjs";

let output = document.getElementById("content");

let arrayObservable = Observable.from([1, 2, 3, 'boo'])
  .filter(value => !isNaN(+value))
  .map(value => `Number: ${value}`)
  .scan((acc, value) => {
    const li = document.createElement("li");
    li.innerText = value;
    acc.appendChild(li);
    return acc;
  }, document.createElement("ol"));

arrayObservable.subscribe(
  value => {
    output.appendChild(value);
  },
  err => console.error(`An error occurred: ${err}`),
  () => console.log('Completed!')
)