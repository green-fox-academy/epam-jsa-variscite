'use strict';

const db = require('../collections/usersDatabase');
const HTTP_STATUSES = require('../modules/httpStatuses');
const {deleteAccessToken} = require('../modules/tokenHandler.js');

function login(req, res) {
  res.setHeader('Content-Type', 'application/json');

  let userInfo = {
    email: req.body.email,
    password: req.body.password,
  };

  if (userInfo.email === '' || userInfo.password === '') {
    res.status(HTTP_STATUSES.BAD_REQUEST).json({'errorType': 'FieldMissing'});
    return;
  } else if (req.header('content-type').toLowerCase() !== 'application/json') {
    res.status(HTTP_STATUSES.BAD_REQUEST).json({'errorType': 'ContentType'});
    return;
  }

  let userAgent = req.header('user-agent').toLowerCase();

  db.checkUserInfo(userAgent, userInfo.email, userInfo.password, res);
}

function logout(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.header('Authorization') === undefined) {
    res.status(HTTP_STATUSES.BAD_REQUEST).json({'errorType': 'HeaderMissing'});
  } else {
    let usernameToken = req.header('Authorization');

    deleteAccessToken(usernameToken, function(err, response) {
      if (err) {
        res.status(HTTP_STATUSES.SERVER_ERROR).
          json({'errorType': 'ServerError'});
      } else {
        res.status(HTTP_STATUSES.NO_CONTENT).json();
      }
    });
  }
}

module.exports = {
  login: login,
  logout: logout,
};
