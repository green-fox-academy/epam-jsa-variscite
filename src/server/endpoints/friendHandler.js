'use strict';

const HTTP_STATUSES = require('../modules/httpStatuses');
const friendsCollection = require('../collections/friendsDatabase');
const usersCollection = require('../collections/usersDatabase');
const {getAccessToken} = require('../modules/tokenHandler');

function findFriends(idArray, res) {
  usersCollection.findUsers(idArray, (err, result) => {
    if (err !== null) {
      res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
      return;
    }
    let friendsInfo = [];

    result.forEach(function(user) {
      let newUser = {};

      newUser._id = user._id;
      newUser.username = user.username;
      newUser.userPicURL = user.userPicURL;
      newUser.numberOfFriends = user.numberOfFriends;
      friendsInfo = friendsInfo.concat(newUser);
    });
    let obj = {friends: friendsInfo};

    res.status(HTTP_STATUSES.OK).json(obj);
  });
}

function getFriendsInfo(req, res) {
  let token = req.header('Authorization');

  getAccessToken(token, function(err, item) {
    if (err) {
      res.status(HTTP_STATUSES.SERVER_ERROR)
        .json({'errorType': 'server error'});
      return;
    }
    if (item === null) {
      res.status(HTTP_STATUSES.UNAUTHORIZED)
        .json({'errorType': 'Unauthorized'});
      return;
    }

    friendsCollection.findFriends(item.userId, (err, id, result) => {
      if (err !== null) {
        res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
        return;
      }

      findFriends(result.userFriends, res);
    });
  });
}

function addFriend(req, res) {
  let token = req.header('Authorization');

  getAccessToken(token, function(err, item) {
    if (err) {
      res.status(HTTP_STATUSES.SERVER_ERROR)
        .json({'errorType': 'server error'});
      return;
    }
    if (item === null) {
      res.status(HTTP_STATUSES.UNAUTHORIZED)
        .json({'errorType': 'Unauthorized'});
      return;
    }
    usersCollection.retrieveUserByUsername(req.params.username, (err, friendId) => {
      if (err) {
        res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
        return;
      }
      console.log(friendId);
      friendsCollection.addFriend(item.userId, friendId._id, (err, result) => {
        if (err !== null) {
          res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
          return;
        }
        res.status(HTTP_STATUSES.OK).json();
      });
    });


  });
}

module.exports = {
  getFriendsInfo: getFriendsInfo,
  addFriend: addFriend,
};
