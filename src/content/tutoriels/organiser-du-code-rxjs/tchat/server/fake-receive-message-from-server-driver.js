import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/empty";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

const fetchDadQuote = () => {
  return Observable.fromPromise(
    fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" }
    })
      .then(response => response.json())
      .then(({ joke }) => joke)
  );
};

const makeReceiveDadQuote$ = () => {
  const minInterval = 10000;
  const randomFactor = 5000;

  return Observable.create(observer => {
    let timeoutId;
    let fetchedQuotes = 0;

    const fetch = () => {
      fetchDadQuote().subscribe(
        quote => {
          fetchedQuotes++;
          observer.next(quote);
        },
        () => {},
        () => {
          if (fetchedQuotes < 10) {
            timeoutId = setTimeout(() => {
              fetch();
            }, minInterval + Math.random() * randomFactor);
          }
        }
      );
    };

    fetch();

    return () => {
      observer.complete();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  });
};

export default () => () => {
  const receivedServerMessage$ = makeReceiveDadQuote$().map(quote => ({
    from: "Un.e rigolo.te",
    content: quote
  }));

  return { stream$: receivedServerMessage$ };
};
