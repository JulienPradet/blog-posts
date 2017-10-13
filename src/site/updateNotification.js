const UPDATE_EVENT = "site_updated";

const dispatchUpdateEvent = () => {
  const updateEvent = document.createEvent("Event");
  updateEvent.initEvent(UPDATE_EVENT, true, true);
  document.body.dispatchEvent(updateEvent);
};

export { UPDATE_EVENT, dispatchUpdateEvent };
