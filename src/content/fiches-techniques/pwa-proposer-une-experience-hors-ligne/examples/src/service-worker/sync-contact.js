import contactStore from "../common/contact-store";
import sendContactRequest from "../common/send-contact-request";

self.addEventListener("sync", event => {
  if (event.tag === "contact") {
    console.log("should sync");
    contactStore.get().then(data => {
      console.log(data);
      sendContactRequest(data);
    });
  }
});
