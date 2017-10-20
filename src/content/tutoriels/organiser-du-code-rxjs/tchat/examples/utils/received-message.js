import "rxjs/add/operator/map";

export default receivedMessageIntent$ => {
  return receivedMessageIntent$.map(message => ({
    ...message,
    type: "received_message"
  }));
};
