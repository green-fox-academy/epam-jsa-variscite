'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_URL;

function findFriends(filter) {
  MongoClient.connect(url, (err, db) => {
    if (err !== null) {
      return;
    }
    retrieveFriends(db, filter);
  });
}

function retrieveFriends(db, filter, callback) {
  db.collection('friends').find(filter, (err, item) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to retrieve friends: ', err);
    }
    db.close();
    callback(err, item);
  });
}

module.exports = {findFriends: findFriends};
