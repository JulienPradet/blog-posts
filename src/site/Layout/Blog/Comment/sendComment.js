import sendCommentRequest from "./sendCommentRequest";
import sendCommentInBackground from "./sendCommentInBackground";

const sendComment = data => {
  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    return sendCommentInBackground(data);
  } else {
    return sendCommentRequest(data).then(
      type => (type === "success" ? "success" : "error")
    );
  }
};

export default sendComment;
