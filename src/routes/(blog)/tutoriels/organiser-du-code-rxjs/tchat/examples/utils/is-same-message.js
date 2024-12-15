export default (unconfirmedMessage, confirmedMessage) => {
	return !unconfirmedMessage.from && unconfirmedMessage.content === confirmedMessage.content;
};
