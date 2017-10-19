'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_URL;

function createNewPost(postInfo) {
  return {
    user: postInfo.token,
    text: postInfo.postText,
    timeStamp: Date.now(),
  };
}

function connectMongoTo(operation, callback) {
  MongoClient.connect(url, (err, db) => {
    console.log(url);
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to connect: ', err);
      db.close();
      return callback(err, null);
    }
    operation(db);
  });
}

function insertDocument(db, postInfo, callback) {
  let collection = db.collection('posts');

  let info = createNewPost(postInfo);

  collection.insert(info, (err, item) => {
    if (err !== null) {
      console.log('[MONGO ERROR]Unable to insert post: ', err);
    }
    db.close();
    callback(err, item);
  });
}

module.exports = {
  insertDocumentBy: (postInfo, callback) => {
    connectMongoTo((db) => {
      insertDocument(db, postInfo, callback);
    });
  },
};

