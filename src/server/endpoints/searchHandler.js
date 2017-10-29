'use strict';

const HTTP_STATUSES = require('../modules/httpStatuses');
const postsCollection = require('../collections/postsDatabase');
const usersCollection = require('../collections/usersDatabase');

function searchUsers(searchText, res) {
  usersCollection.retrieveUsersByUsername(searchText, (result) => {
    if (result !== null) {
      let users = result.map(function(user) {
        let basicUserInfo = {};

        basicUserInfo.username = user.username;
        basicUserInfo.userPicURL = user.userPicURL;
        return basicUserInfo;
      });
      let obj = {people: users};

      res.status(HTTP_STATUSES.OK).json(obj);
    }
  });
}

function searchPosts(searchText, res) {
  postsCollection.retrievePostsByPostText(searchText, (result) => {
    if (result !== null) {
      let data = [];

      result.forEach(function(val) {
        val.numOfComments = val.comments.length;
        val.numOfLikes = val.likes.length;
        val.numOfShares = val.shares.length;
        data = data.concat(val);
        data = data.concat(val.shares.map(function(item) {
          let newVal = Object.assign({}, val);
          let newUserName = [];

          newUserName.push(item.userName, val.username);
          newVal.username = newUserName;
          newVal.originTimeStamp = newVal.timeStamp;
          newVal.timeStamp = item.timeStamp;
          newVal.newUserPicURL = item.userPicURL;
          return newVal;
        }));
      });

      let obj = {post: data};

      res.status(HTTP_STATUSES.OK).json(obj);
    }
  });
}

function search(req, res) {
  let type = req.params.type;
  let searchText = req.params.searchText;

  if (type === 'people') {
    searchUsers(searchText, res);
  } else if (type === 'posts') {
    searchPosts(searchText, res);
  } else {
    res.status(HTTP_STATUSES.BAD_REQUEST).json({});
  }
}

module.exports = {search: search};

