'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = process.env.DB_URL;

function createNewPost(postInfo) {
  return {
    userId: postInfo.token,
    username: postInfo.username,
    postText: postInfo.postText,
    timeStamp: Date.now(),
    userPicURL: 'https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg',
    postPicURL: 'http://ronpaulinstitute.org/media/121032/donald-trumps-mexico-border-wall-557313.jpg',
    likes: [],
    comments: [],
    shares: [],
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

function likePost(id, userName, callback) {
  MongoClient.connect(url, (err, db) => {
    if (err !== null) {
      console.log('Couldn\'t get connect to the db', err);
      callback(null);
    }
    db.collection('posts').findOne({'_id': ObjectId(id)}, function(err, element) {
      if(element.likes.includes(userName)) {
        let index = element.likes.indexOf(userName);
        element.likes.splice(index, 1);
      } else {
        element.likes.push(userName);
      }
      db.collection('posts').findAndModify({_id: ObjectId(id)}, [['_id', 1]],{$set:{likes:element.likes}}, {new:true, w:1}, function(err, element){
        db.close();
        callback(element.value.likes.length);
      });
		});
  });
}

module.exports = {
  insertDocument: (postInfo, callback) => {
    connectMongoTo((db) => {
      insertDocument(db, postInfo, callback);
    });
  },
  findPosts: findPosts,
  likePost: likePost,
};
