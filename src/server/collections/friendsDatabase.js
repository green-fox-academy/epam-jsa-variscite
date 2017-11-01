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

function checkIsFriend(visitor, friend, callback) {
  MongoClient.connect(url, (err, db) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to connect to db: ', err);
      return;
    }
    let objectId = new ObjectId(visitor);

    db.collection('friends').findOne({userId: objectId}, (err, result) => {
      if (err !== null) {
        console.log('[MONGO ERROR] Unable to retrieve friends: ', err);
        return
      }
      if (result === null) {
        db.collection('friends').insert({
          "userId" : objectId,
          "userFriends" : []
        }, function(err, item) {
          if (err !== null) {
            console.log('Couldn\'t get connect to the db', err);
            callback(null);
            return;
          }
          db.close();
          callback(false);
          return;
        });
      } else {
        let friendList = result.userFriends.map(function(obj) {
          return obj.toString();
        });
        if (friendList.includes(friend.toString())) {
          db.close();
          callback(true);
          return;
        } else {
          db.close();
          callback(false);
          return;
        }
      }
    });
  });
}
function addFriend(id, friend, callback) {
  MongoClient.connect(url, (err, db) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to connect to db: ', err);
      return;
    }
    let objectId = new ObjectId(id);
    let friendId = new ObjectId(friend);

    db.collection('friends')
      .findOne({'userId': objectId}, function(err, element) {
        if (err !== null) {
          console.log('Couldn\'t get connect to the db', err);
          callback(null);
          return;
        }
        if (element === null) {
          db.collection('friends').insert({
            "userId" : objectId,
            "userFriends" : [friend]
          }, function(err, result) {
            if (err !== null) {
              console.log('Couldn\'t get connect to the db', err);
              callback(null);
              return;
            }
            db.close();
            callback(err, result);
            return;
          });
          return;
        } else {
          element.userFriends.push(friendId);
          db.collection('friends').findAndModify(
            {userId: objectId},
            [['_id', 1]],
            {$set: {userFriends: element.userFriends}},
            {new: true, w: 1},
            function(err, item) {
              if (err !== null) {
                console.log('Couldn\'t get connect to the db', err);
                callback(err);
                return;
              }
              db.close();
              callback(err, item);
              return;
            }
          );
        }
      });
  });
}

module.exports = {
  findFriends: findFriends,
  addFriend: addFriend,
  checkIsFriend: checkIsFriend,
  deleteAFriend: deleteAFriend,
};
