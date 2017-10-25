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

function createNewComment(commentInfo) {
  return {
    userId: commentInfo.userId,
    postId: commentInfo.postId,
    username: commentInfo.username,
    commentText: commentInfo.commentText,
    timeStamp: Date.now(),
    userPicURL: commentInfo.userPicURL,
    likes: [],
    replys: [],
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

function insertComment(commentInfo, callback) {
  let info = createNewComment(commentInfo);

  connectMongoTo((db) => {
    let objectId = new ObjectId(info.postId);

    db.collection('posts').update({_id: objectId}, {$push: {'comments': info}}, function(err, result) {
      if (err !== null) {
        console.log('[MONGO ERROR] Unable to insert comments: ', err);
      }
      callback(err, info);
    });
  });
}

function findComments(id, callback) {
  connectMongoTo((db) => {
    let objectId = new ObjectId(id);

    db.collection('posts').find({_id: objectId}).toArray((err, result) => {
      if (err !== null) {
        console.log('[MONGO ERROR] Unable to retrieve comments: ', err);
      }
      db.close();
      callback(err, result);
    });
  });
}

function insertDocument(db, postInfo, callback) {
  let collection = db.collection('posts');

  let info = createNewPost(postInfo);

  collection.insert(info, (err, item) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to insert post: ', err);
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
      return;
    }
    db.collection('posts')
      .findOne({'_id': ObjectId(id)}, function(err, element) {
        let like;

        if (err !== null) {
          console.log('Couldn\'t get connect to the db', err);
          callback(null);
          return;
        } else if (element.likes.includes(userName)) {
          let index = element.likes.indexOf(userName);
          let numOfItemToDelete = 1;

          like = false;

          element.likes.splice(index, numOfItemToDelete);
        } else {
          like = true;
          element.likes.push(userName);
        }
        db.collection('posts').findAndModify(
          {_id: ObjectId(id)},
          [['_id', 1]],
          {$set: {likes: element.likes}},
          {new: true, w: 1},
          function(err, item) {
            if (err !== null) {
              console.log('Couldn\'t get connect to the db', err);
              callback(null);
              return;
            }
            db.close();
            callback({likes: item.value.likes.length, isUserLiked: like});
            return;
          }
        );
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
  insertComment: insertComment,
  findComments: findComments,
  likePost: likePost,
};
