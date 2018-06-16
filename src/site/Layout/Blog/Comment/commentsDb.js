import { get, set } from "idb-keyval/dist/idb-keyval-cjs.js";
const COMMENTS_KEY = "comments";

const getComments = () => get(COMMENTS_KEY).then(comments => comments || []);

const setComments = comments =>
  set(COMMENTS_KEY, comments || []).then(() => {
    return comments;
  });

export { getComments, setComments };
