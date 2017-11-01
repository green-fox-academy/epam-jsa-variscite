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

    res.status(HTTP_STATUSES.OK).json({
      friends: result.map(function(user) {
        return {
          _id: user._id,
          username: user.username,
          userPicURL: user.userPicURL,
          numberOfFriends: user.numberOfFriends,
        };
      }),
    });
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

    friendsCollection.findFriends(item.userId, (err, userId, friendDescriptor) => {
      if (err !== null) {
        res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
        return;
      }

      findFriends(friendDescriptor.userFriends, res);
    });
  });
}

function handleDBError(res, err, tokenDescriptor) {
  if (err) {
    res.status(HTTP_STATUSES.SERVER_ERROR).json({'errorType': 'server error'});
    return;
  }
  if (tokenDescriptor === null) {
    res.status(HTTP_STATUSES.UNAUTHORIZED).json({'errorType': 'Unauthorized'});
    return;
  }
}

function deleteFriend(req, res) {
  if (req.params === undefined) {
    res.status(HTTP_STATUSES.BAD_REQUEST).json({});
    return;
  }

  let token = req.header('authorization');

  getAccessToken(token, function(err, tokenDescriptor) {
    handleDBError(res, err, tokenDescriptor);

    friendsCollection.deleteAFriend(tokenDescriptor.userId, req.params.friendId, (err) => {
      if (err !== null) {
        res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
        return;
      }
      res.status(HTTP_STATUSES.OK).json({});
    });
  });
}

module.exports = {
  getFriendsInfo: getFriendsInfo,
  deleteFriend: deleteFriend,
};
