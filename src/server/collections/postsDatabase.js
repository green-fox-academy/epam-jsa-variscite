'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_URL;

function createNewPost(postInfo) {
  return {
    userId: postInfo.token,
    username: postInfo.username,
    postText: postInfo.postText,
    timeStamp: Date.now(),
    userPicURL: 'https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg',
    postPicURL: 'http://ronpaulinstitute.org/media/121032/donald-trumps-mexico-border-wall-557313.jpg',
    numOfLikes: 0,
    comments: [],
    numOfShares: 0,
  };
}

function connectMongoTo(operation, callback) {
  MongoClient.connect(url, (err, db) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to connect: ', err);
      db.close();
      return callback(err, null);
    }
    operation(db);
  });
}

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
  connectMongoTo((db) => {
    retrievePosts(db, array, callback);
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
  insertDocument: (postInfo, callback) => {
    connectMongoTo((db) => {
      insertDocument(db, postInfo, callback);
    });
  },
  findPosts: findPosts,
};
