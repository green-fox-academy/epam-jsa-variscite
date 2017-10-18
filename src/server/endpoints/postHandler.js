'use strict';

const tokenHandler = require('../modules/tokenHandler');
const postsDb = require('../collections/posts');
const friendsDb = require('../collections/friends');
const usersDb = require('../collections/usersDatabase');
const HTTP_STATUSES = require('../modules/httpStatuses');
const {getAccessToken} = require('../modules/tokenHandler.js');

function displayPosts(req, res) {
  let token = req.body.token;
  tokenHandler.getAccessToken(token, (err, tokenDescriptor) => {
  	if (err !== null) {
      return;
    }
    let filter = {userId: tokenDescriptor.userId}
    friendsDb.findFriends(filter, (err, item) => {
      if (err !== null) {
        return;
      }
      let filter={};
      postsDb.findPosts(filter)
    })
  })
}
