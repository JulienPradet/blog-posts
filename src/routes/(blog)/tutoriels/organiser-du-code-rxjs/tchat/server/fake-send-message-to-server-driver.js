import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

const simulateSendMessage = ({ message }) => {
	return Observable.fromPromise(
		new Promise((resolve, reject) => {
			setTimeout(
				() => {
					resolve({
						from: 'Votre humble personne',
						content: message
					});
				},
				500 + Math.random() * 500
			);
		})
	);
};

export default () => (request$) => {
	const sentMessage$ = request$.mergeMap(({ message }) =>
		simulateSendMessage({
			message
		})
	);

	return { response$: sentMessage$ };
};
