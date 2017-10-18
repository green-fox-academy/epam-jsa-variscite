'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_URL;

function createNewPost(postInfo) {
  let newPost = {};

  newPost.user = postInfo.userID;
  newPost.text = postInfo.postText;
  newPost.time = new Date();
  return newPost;
}

function connectMongoTo(operation, callback) {
  MongoClient.connect(url, (err, db) => {
    console.log(url);
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to connect: ', err);
      db.close();
      return callback(err, null);
    }
    console.log('gooddddddd');
    operation(db);
  });
}

function insertDocument(db, postInfo, callback) {
  let collection = db.collection('posts');

  console.log(db);

  let info = createNewPost(postInfo);

  console.log(info);
  collection.insert(info, (err, item) => {
    if (err !== null) {
      console.log('Unable to insert post: ', err);
    }
    console.log(item);
    db.close();
    callback(err, item);
  });
}

module.exports = {
  insertDocumentByID: (postInfo, callback) => {
    connectMongoTo((db) => {
      insertDocument(db, postInfo, callback);
    });
  },
};

