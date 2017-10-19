'use strict';

const HTTP_STATUSES = require('../modules/httpStatuses');
const postsCollection = require('../collections/postsDatabase');
const friendsCollection = require('../collections/friendsDatabase');
const {getAccessToken} = require('../modules/tokenHandler');

function findPosts(array, res) {
  postsCollection.findPosts(array, (err, result)=> {
    if (err !== null) {
      res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
      return;
    }
    if (result !== null) {
      let obj = {post: result};

      res.status(HTTP_STATUSES.OK).json(obj);
    } else {
      res.status(HTTP_STATUSES.OK).json({});
    }
  });
}

function findAllPosts(id, item, res) {
  if (item !== null) {
    let users = item.userFriends;

    users.push(item.userId);
    findPosts(users, res);
  } else {
    let user = [id];

    findPosts(user, res);
  }
}

function findUserFriends(tokenDescriptor, res) {
  let id = tokenDescriptor.userId.toString();

  friendsCollection.findFriends(id, (err, id, item) => {
    if (err !== null) {
      res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
      return;
    }
    findAllPosts(id, item, res);
  });
}

function displayPosts(req, res) {
  let token = req.header('Authorization');

  getAccessToken(token, (err, tokenDescriptor) => {
    if (err !== null) {
      res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
      return;
    }
    if (tokenDescriptor === null) {
      res.status(HTTP_STATUSES.UNAUTHORIZED).json({errorType: 'loginError'});
      return;
    }
    findUserFriends(tokenDescriptor, res);
  });
}

module.exports = {displayPosts: displayPosts};
