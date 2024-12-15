// On n'oublie pas d'enregistrer
// le Service Worker
if ('serviceWorker' in navigator) {
	// On essaye d'enregistrer le Service
	// Worker
	navigator.serviceWorker.register('service-worker.js');
}
