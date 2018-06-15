/* eslint no-restricted-globals: 1 */
self.addEventListener("message", messageEvent => {
  if (messageEvent.data.type) {
    if (messageEvent.data.type === "background-request") {
      messageEvent.ports.forEach(port => port.postMessage("success"));
    }
  }
});
