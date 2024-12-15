import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromEvent';

const domSource = (dom$, getElement) => ({
	select: (selector) => domSource(dom$, () => getElement().querySelector(selector)),
	on: (event) => dom$.switchMap(() => Observable.fromEvent(getElement(), event))
});

const domDriver = (element) => (vdom$) => {
	let rootNode, prevTree;

	vdom$ = vdom$.publish();
	vdom$.connect();
	const dom$ = vdom$
		.take(1)
		.do((tree) => {
			// Rendu initial
			rootNode = createElement(tree);
			element.appendChild(rootNode);
			prevTree = tree;
		})
		.concat(
			// Patch à chaque nouvelle version du vdom$
			vdom$.skip(1).do((tree) => {
				rootNode = patch(rootNode, diff(prevTree, tree));
				prevTree = tree;
			})
		)
		.publish();

	dom$.connect();
	dom$.subscribe();

	return domSource(dom$, () => rootNode);
};

export default domDriver;
