'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = process.env.DB_URL;

function retrieveFriends(db, id, callback) {
  db.collection('friends').findOne({userId: id}, (err, result) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to retrieve friends: ', err);
    }
    db.close();
    callback(err, id, result);
  });
}

function findFriends(id, callback) {
  MongoClient.connect(url, (err, db) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to connect to db: ', err);
      return;
    }
    let objectId = new ObjectId(id);

    retrieveFriends(db, objectId, callback);
  });
}

module.exports = {findFriends: findFriends};
