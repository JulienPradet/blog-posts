import { getComments, setComments } from "./commentsDb";
import sendRequest from "./sendRequest";

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
        status: "sync",
        attempts: 0,
        data
      }
    ]);
  });
};

const sendComment = data => {
  saveComment(data);
  if (
    "serviceWorker" in navigator &&
    "SyncManager" in window &&
    navigator.serviceWorker.controller
  ) {
    return Promise.all([navigator.serviceWorker.ready, saveComment(data)])
      .then(([registration]) => {
        return registration.sync.register("comment");
      })
      .then(() => "sync")
      .catch(e => {
        console.error("ERROR", e);
        return sendCommentFallback(data);
      });
  } else {
    return sendCommentFallback(data);
  }
};

export default sendComment;
