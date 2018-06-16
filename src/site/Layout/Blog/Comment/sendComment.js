import { getComments, setComments } from "./commentsDb";
import sendRequest from "../../../sendRequest";

const sendCommentFallback = data => {
  return sendRequest(data).then(
    type => (type === "success" ? "success" : "error")
  );
};

const saveComment = data => {
  return getComments().then(comments => {
    return setComments([
      ...comments,
      {
        originalTime: new Date().getTime(),
        status: "pending",
        attempts: 0,
        data
      }
    ]);
  });
};

const sendComment = data => {
  if ("serviceWorker" in navigator && "SyncManager" in window) {
    return Promise.all([navigator.serviceWorker.ready, saveComment(data)])
      .then(([registration]) => {
        return registration.sync.register("comment");
      })
      .then(() => "success")
      .catch(e => {
        console.error("ERROR", e);
        return sendCommentFallback();
      });
  } else {
    return sendCommentFallback();
  }
};

export default sendComment;
