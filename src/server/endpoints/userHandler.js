'use strict';

const HTTP_STATUSES = require('../modules/httpStatuses');
const usersCollection = require('../collections/usersDatabase');
const {getAccessToken} = require('../modules/tokenHandler');

function getUserInfo(req, res) {
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

    usersCollection.findUsername(item.userId, (result) => {
      let user = {
        'username': result.username,
        'email': result.email,
        'phonenumber': result.phonenumber,
        'fullname': result.fullname,
      };

      let obj = {info: user};

      res.status(HTTP_STATUSES.CREATED).json(obj);
    });
  });
}

module.exports = {getUserInfo: getUserInfo};
