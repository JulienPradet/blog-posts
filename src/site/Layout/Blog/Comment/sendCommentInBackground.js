const sendCommentInBackground = data => {
  if (!("serviceWorker" in navigator) || !navigator.serviceWorker.controller) {
    throw new Error(
      "Background requests are not available for browsers with ne Service Workers."
    );
  }

  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();

    navigator.serviceWorker.controller.postMessage(
      { type: "background-request", request: data },
      [channel.port2]
    );

    channel.port1.onmessage = e => {
      if (e.data.error) {
        reject("error");
      } else {
        resolve("success");
      }
    };
    channel.port1.onmessageerror = e => {
      reject("error");
    };
  });
};

export default sendCommentInBackground;
