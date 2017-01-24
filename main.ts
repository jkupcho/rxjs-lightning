import { Observable } from "rxjs";
import { loadWithFetch, load } from './loader';

// let source = Observable.merge(
//   Observable.of(1),
//   Observable.from([2,3,4]),
//   Observable.throw(new Error("Stop!")),
//   Observable.of(5)
// // Allows for returning an Observable if an error occurs.
// ).catch(e => {
//   console.log(`caught: ${e}`);
//   return Observable.of(10);
// });

// source.subscribe(
//   value => console.log(`value ${value}`),
//   error => console.error(`error: ${error}`),
//   () => console.log("complete")
// );

let output = document.getElementById("output");
let button = document.getElementById("button");

let click = Observable.fromEvent(button, "click");


let subscription = load("moviess.json")
  .subscribe(renderMovies,
    e => console.log(`error: ${e}`),
    () => console.log("complete!")
);

subscription.unsubscribe();

function renderMovies(movies) {
  movies.forEach(m => {
    let div = document.createElement("div");
    div.innerText = m.title;

    output.appendChild(div);
  })
}

click.flatMap(e => loadWithFetch("movies.json"))
  .subscribe(
  renderMovies,
  e => console.error(`error: ${e}`),
  () => console.log("complete")
);