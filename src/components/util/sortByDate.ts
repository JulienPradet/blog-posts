const sortByDate = (metaA, metaB) => {
	if (metaA.date < metaB.date) {
		return 1;
	} else if (metaA.date > metaB.date) {
		return -1;
	}
	return 0;
};

export { sortByDate };
