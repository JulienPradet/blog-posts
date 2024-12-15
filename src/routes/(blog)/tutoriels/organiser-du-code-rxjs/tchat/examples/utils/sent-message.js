import 'rxjs/add/operator/map';

export default (sendMessageSource) => {
	const sentMessage$ = sendMessageSource.response$.map((message) => ({
		...message,
		type: 'sent_message'
	}));

	return sentMessage$;
};
