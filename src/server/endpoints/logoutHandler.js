'use strict';

const HTTP_STATUSES = require('../modules/httpStatuses');
const tokensCollection = require('../collections/tokens.js');
const deleteAccessToken = tokensCollection.deleteDocumentByToken;

function logout(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let status;

  if (req.header === null) {
    let obj = {'errorType': 'HeaderMissing'};

    status = HTTP_STATUSES.UNAUTHORIZED;
    res.status(status).json(obj);
  } else if (req.header.token === null) {
    let obj = {'errorType': 'TokenMissing'};

    status = HTTP_STATUSES.FORBIDDEN;
    res.status(status).json(obj);
  } else {
    let Token = req.headers.token;

    deleteAccessToken(Token, function(err, response) {
      if (err) {
        status = HTTP_STATUSES.SERVER_ERROR;
        res.status(status).json(err);
      } else {
        status = HTTP_STATUSES.NO_CONTENT;
        res.status(status).json();
      }
    });
  }
}

module.exports = {logout: logout};
