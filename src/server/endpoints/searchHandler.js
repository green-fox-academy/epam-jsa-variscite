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

}

function search(req, res) {
  let type = req.params.type;

  if (type === 'people') {
    searchUsers(req.body.searchText, res);
  } else if (type === 'posts') {
    searchPosts(req.body.searchText, res);
  } else {

  }
}

module.exports = {search: search};

