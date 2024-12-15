import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import init from '../core/init';
import domDriver from '../core/domDriver';
import displayView from '../view';

const App = () => {
	const model$ = Observable.of({ messageList: [] });

	const view$ = model$.switchMap((model) => displayView(model));

	return {
		dom: view$
	};
};

export default (domElement) =>
	init(App, {
		dom: domDriver(domElement)
	});
