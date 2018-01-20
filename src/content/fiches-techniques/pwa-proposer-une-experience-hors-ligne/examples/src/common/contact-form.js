import contactStore from "./contact-store";
import sendContactRequest from "./send-contact-request";

const getDataFromForm = form => {
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, name) => {
    data[name] = value;
  });
  return data;
};

const sendContactRequestWithOfflineSupport = (data = null) => {
  if (data) {
    localStorage.setItem("contact", JSON.stringify(data));
  } else {
    data = JSON.parse(localStorage.getItem("contact"));
  }

  if (data && navigator.onLine) {
    sendContactRequest(data)
      .then(() => {
        localStorage.setItem("contact", null);
      })
      .catch(() => {
        setTimeout(sendContactRequestWithOfflineSupport, 60000);
      });
  }
};

export const listenContactRequest = form => {
  window.addEventListener("online", () => {
    sendContactRequestWithOfflineSupport();
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = getDataFromForm(event.target);
    if (false && "serviceWorker" in navigator && "SyncManager" in window) {
      navigator.serviceWorker.ready
        .then(reg => {
          event.preventDefault();
          return contactStore.set(data).then(() => {
            reg.sync.register("contact");
          });
        })
        .catch(() => sendContactRequestWithOfflineSupport(data));
    } else {
      sendContactRequestWithOfflineSupport(data);
    }
  });
};
