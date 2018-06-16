/* eslint no-restricted-globals: 1 */
import sendRequest from "./sendRequest";
import { getComments, setComments } from "./commentsDb";

const updateComments = newComments => {
  return getComments().then(comments => {
    return setComments(
      comments.map(c => {
        const updatedComment = newComments.find(
          comment => comment.originalTime === c.originalTime
        );
        if (updatedComment) {
          return updatedComment;
        } else {
          return c;
        }
      })
    );
  });
};

const broadcast = message => {
  return self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage(message);
    });
  });
};

self.addEventListener("sync", event => {
  if (event.tag === "comment") {
    const timeout = setTimeout(() => {
      broadcast("comments-update");
    }, 150);

    event.waitUntil(
      getComments().then(comments => {
        Promise.all(
          comments
            .filter(
              comment =>
                comment.status === "pending" || comment.status === "retry"
            )
            .map(comment => {
              return sendRequest(comment.data).then(status => ({
                ...comment,
                attempts: comment.attempts + 1,
                status
              }));
            })
        )
          .then(comments => {
            return updateComments(comments);
          })
          .then(() => {
            clearTimeout(timeout);
            broadcast("comments-update");
          });
      })
    );
  }
});
