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
    userPicURL: 'https://www.nbr.co.nz/sites/default/files/blog_post_img/Trump-impact_0.jpg',
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
  let newArray = array.map(function(id) {
    let stringId = id.toString();

    return stringId;
  });
  let filter = {userId: {'$in': newArray}};

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

function sharePost(id, userName, userPicURL, callback) {
  MongoClient.connect(url, (err, db) => {
    if (err !== null) {
      console.log('Couldn\'t get connect to the db', err);
      callback(null);
      return;
    }
    db.collection('posts')
      .findOne({'_id': ObjectId(id)}, function(err, element) {
        if (err !== null) {
          console.log('Couldn\'t get connect to the db', err);
          callback(null);
          return;
        }
        element.shares.push({userName: userName, userPicURL: userPicURL, timeStamp: Date.now()});

        db.collection('posts').findAndModify(
          {_id: ObjectId(id)},
          [['_id', 1]],
          {$set: {shares: element.shares}},
          {new: true, w: 1},
          function(err, item) {
            if (err !== null) {
              console.log('Couldn\'t get connect to the db', err);
              callback(null);
              return;
            }
            db.close();
            callback(item.value.shares.length);
            return;
          }
        );
      });
  });
}

function removePost(db, id, callback) {
  db.collection('posts').remove({_id: ObjectId(id)}, function(err, obj) {
    if (err !== null) {
      console.log('Couldn\'t find post from db', err);
      callback(null);
      return;
    }
    db.close();
    callback(err);
  });
}

function removeSharedPost(db, id, sharedUser, callback) {
  db.collection('posts').updateOne({_id: new ObjectId(id)}, {$pull: {shares: {userName: sharedUser}}}, function(err, result) {
    if (err !== null) {
      console.log('Couldn\'t find friend from db', err);
      callback(null);
      return;
    }
    callback(err);
  });
}

function deletePost(id, sharedUser, callback) {
  connectMongoTo((db) => {
    if (sharedUser === undefined) {
      removePost(db, id, callback);
    } else {
      removeSharedPost(db, id, sharedUser, callback);
    }
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
  sharePost: sharePost,
  deletePost: deletePost,
};
