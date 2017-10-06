const UPDATE_EVENT = "site_updated";

const dispatchUpdateEvent = () => {
  console.log("update");
  const updateEvent = document.createEvent("Event");
  updateEvent.initEvent(UPDATE_EVENT, true, true);
  document.body.dispatchEvent(updateEvent);
};

export { UPDATE_EVENT, dispatchUpdateEvent };
