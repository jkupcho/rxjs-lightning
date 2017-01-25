import { Observable } from "rxjs";
import { loadWithFetch, load } from './loader';

let output = document.getElementById("output");
let button = document.getElementById("button");

let click = Observable.fromEvent(button, "click");

function renderCats(cats) {
  cats.forEach(m => {
    let div = document.createElement("div");
    div.innerText = m.title;

    output.appendChild(div);
  })
}

let catObservable = click.flatMap(e => loadWithFetch("cats.json"))
  .flatMap((cats:any) => Observable.from(cats))
  .map((cat:any) => {
    if (cat.type === 'Calico') {
      // Keep it pure, yo
      return Object.assign({}, cat, { special: true} );
    }
    return cat;
  })
  .scan((acc, value, index) => {
    let catEl = document.createElement("div");
    
    let catImg = document.createElement("img");
    // lorempixel cats seem to work best starting at 7
    const catIndex = index + 7;
    catImg.src = `http://lorempixel.com/g/200/200/cats/${catIndex}`;
    
    let catNameEl = document.createElement("h3");
    catNameEl.innerText = value.name;

    if (value.special) {
      catEl.className = "special";
    }
    
    catEl.appendChild(catImg);
    catEl.appendChild(catNameEl);

    acc.appendChild(catEl);

    return acc;
  }, document.createElement("div"));

catObservable.subscribe(
    catDiv => output.appendChild(catDiv),
    e => console.error(`error: ${e}`),
    () => console.log("complete")
);