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

function deleteAFriend(userId, friendId, callback) {
  MongoClient.connect(url, (err, db) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to connect to db: ', err);
      return;
    }

    db.collection('friends').updateOne({userId: new ObjectId(userId)}, {$pull: {userFriends: new ObjectId(friendId)}}, function(err, result) {
      if (err !== null) {
        console.log('Couldn\'t find friend from db', err);
        callback(null);
        return;
      }
      callback(err);
    });
  });
}

module.exports = {
  findFriends: findFriends,
  deleteAFriend: deleteAFriend,
};
