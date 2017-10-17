'use strict';

const db = require('../collections/usersDatabase');
const HTTP_STATUSES = require('../modules/httpStatuses');

function login(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let email = req.body.email;
  let password = req.body.password;
  let status = HTTP_STATUSES.OK;
  let contentType = req.headers['content-type'].toLowerCase();
  let obj = {};

  if (email === '' || password === '') {
    obj = {'errorType': 'FieldMissing'};
    status = HTTP_STATUSES.BAD_REQUEST;
  } else if (contentType !== 'application/json') {
    obj = {'errorType': 'ContentType'};
    status = HTTP_STATUSES.BAD_REQUEST;
  }

  if (status !== HTTP_STATUSES.OK) {
    res.status(status).json(obj);
    return;
  }

  let userAgent = req.headers['user-agent'].toLowerCase();

  db.checkUserInfo(userAgent, email, password, res);
}

module.exports = {login: login};
