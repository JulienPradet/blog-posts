const formatDate = (date: Date, lang = 'fr-FR') => {
	const dateFormatter = new Intl.DateTimeFormat(lang, {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	return dateFormatter.format(date);
};

const formatSimpleDate = (date: Date, lang = 'fr-FR') => {
	const dateFormatter = new Intl.DateTimeFormat(lang, {
		year: 'numeric',
		month: 'short'
	});
	return dateFormatter.format(date);
};

export { formatDate, formatSimpleDate };
