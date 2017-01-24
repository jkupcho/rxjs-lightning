// Credit goes to Pluralsight on this, not that I crammed a Pluralsight lesson in on RxJS the night
// before the talk or anything. **cough**
import { Observable } from "rxjs";

export function load(url: string) {
  return Observable.create(observer => {
    let xhr = new XMLHttpRequest();

    let onLoad = () => {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        observer.next(data);
        observer.complete();
      } else {
        observer.error(xhr.statusText);
      }
    };

    xhr.addEventListener("load", onLoad);

    xhr.open("GET", url);
    xhr.send();

    // Invoked when unsubscribe is called.
    return () => {
        console.log("cleanup");
        xhr.removeEventListener("load", onLoad);
        xhr.abort();
    }
  });
}

export function loadWithFetch(url: string) {
    return Observable.fromPromise(fetch(url).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return [];
    }));
}