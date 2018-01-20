const idb = require("idb");

const DB_NAME = "contact-store";
const STORE_NAME = "contact";
const CONTACT_KEY = "contact";

const dbPromise = idb.open(DB_NAME, 1, upgradeDB => {
  upgradeDB.createObjectStore(STORE_NAME);
});

const contactStore = {
  get() {
    return dbPromise
      .then(db => {
        return db
          .transaction(STORE_NAME)
          .objectStore(STORE_NAME)
          .get(CONTACT_KEY);
      })
      .then(data => JSON.parse(data));
  },
  set(data) {
    return dbPromise.then(db => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).put(JSON.stringify(data), CONTACT_KEY);
      return tx.complete;
    });
  },
  clear() {
    return dbPromise.then(db => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).clear();
      return tx.complete;
    });
  }
};

export default contactStore;
