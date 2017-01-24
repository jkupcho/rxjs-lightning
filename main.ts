import { Observable } from "rxjs";

let output = document.getElementById("content");

let arrayObservable = Observable.from([1, 2, 3, 'boo']);

arrayObservable.subscribe(
  value => {
    let element = document.createElement("span");
    // convert to string
    element.innerText = '' + value;
    output.appendChild(element);
  },
  err => console.error(`An error occurred: ${err}`),
  () => console.log('Completed!')
)