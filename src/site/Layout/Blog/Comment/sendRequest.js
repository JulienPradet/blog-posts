const sendRequest = data => {
  const body = Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");

  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body
  })
    .then(response => {
      if (response && response.status === 200) {
        return "success";
      } else if (response && ("" + response.status).startsWith("4")) {
        return "error";
      } else {
        return "retry";
      }
    })
    .catch(() => {
      return "retry";
    });
};

export default sendRequest;
