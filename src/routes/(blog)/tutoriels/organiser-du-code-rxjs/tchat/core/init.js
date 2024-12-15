import { ReplaySubject } from 'rxjs/ReplaySubject';

// L'application est donc un Observable d'éléments
// du virtual-dom (cf. `./dom.js`)
// Il faut donc écouter chaque mise à jour pour
// mettre à jour les éléments du DOM.
const init = (App, drivers, element) => {
	const sinkProxies = Object.keys(drivers).reduce(
		(drivers, driverName) => ({
			...drivers,
			[driverName]: new ReplaySubject()
		}),
		{}
	);

	const sources = Object.keys(drivers).reduce((sources, driverName) => {
		const source = drivers[driverName](sinkProxies[driverName]);
		return {
			...sources,
			[driverName]: source
		};
	}, {});

	const sinks = App(sources);

	const unsubscribeSinks = Object.keys(sinks).map((key) => {
		if (!sinks.hasOwnProperty(key)) {
			console.warn(`Missing ${key} sink`, sinks);
			return () => {};
		} else if (typeof sinks[key].subscribe !== 'function') {
			console.warn(`${key} sink should be an observable`, sinks[key]);
			return () => {};
		} else {
			return sinks[key].subscribe(
				(e) => sinkProxies[key].next(e),
				(error) => sinkProxies[key].error(error),
				() => sinkProxies[key].complete()
			);
		}
	});

	return () => unsubscribeSinks.forEach((unsubscribe) => unsubscribe());
};

export default init;
