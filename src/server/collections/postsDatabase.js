'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_URL;

function retrievePosts(db, array, callback) {
  let filter = {userId: {'$in': array}};

  db.collection('posts').find(filter).toArray((err, result) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to retrieve friends: ', err);
    }
    db.close();
    callback(err, result);
  });
}

function findPosts(array, callback) {
  MongoClient.connect(url, (err, db) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to connect to db: ', err);
      return;
    }
    retrievePosts(db, array, callback);
  });
}

module.exports = {findPosts: findPosts};
