import contactStore from "./contact-store";

const sendContactRequest = data => {
  return fetch("/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(() => {
      console.log("Contact request successfully sent");
      contactStore.clear();
    })
    .catch(error => {
      console.log("Contact request failed. Waiting to be back online.");
      throw error;
    });
};

export default sendContactRequest;
