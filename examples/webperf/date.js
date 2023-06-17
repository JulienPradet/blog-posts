import moment from 'moment';
import 'moment/dist/locale/fr';

moment.locale('fr');

function initRelativeDateTimes() {
	for (let time of document.querySelectorAll('time')) {
		const datetime = time.getAttribute('datetime');
		time.innerHTML = moment(datetime).fromNow();
	}
}

export { initRelativeDateTimes };
