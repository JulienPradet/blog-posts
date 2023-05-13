import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/map";
import h from "virtual-dom/h";

// La représentation de mes éléments du DOM est un mix entre
// virtual-dom et des observables.
// Plus exactement c'est un Observable qui contient un flux
// de déclaration du virtual-dom. Cette pirouette est utile
// car elle permet de faire un système de composant : les
// enfants peuvent être un MVI complet.

const domElement = (name, attributes = {}, ...children) => {
  const cleanChildren = children
    .reduce(
      (acc, child) => [...acc, ...(Array.isArray(child) ? child : [child])],
      []
    )
    .map(child => {
      if (typeof child === "string") {
        return Observable.of(child);
      } else {
        return child;
      }
    });

  if (cleanChildren.length === 0) {
    return Observable.of(h(name, attributes));
  } else {
    return Observable.combineLatest(cleanChildren).map(trees =>
      h(name, attributes, trees)
    );
  }
};

export default domElement;
