import { Observable, scan } from 'rxjs';

const reduceObservable = <T, O>(
	reducer: (acc: T, item: O) => T,
	starter: T,
	observable$: Observable<O>
): Observable<T> => {
	return new Observable((observer) => {
		let dataToReturn: T;

		observable$.pipe(scan(reducer, starter)).subscribe(
			(data) => {
				dataToReturn = data;
			},
			(error) => {
				observer.error(error);
			},
			() => {
				observer.next(dataToReturn);
				observer.complete();
			}
		);
	});
};

export default reduceObservable;
