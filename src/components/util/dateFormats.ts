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

const formatIsoDate = (date: Date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

export { formatDate, formatSimpleDate, formatIsoDate };
