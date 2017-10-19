'use strict';

const HTTP_STATUSES = require('../modules/httpStatuses');
const {insertDocumentBy} = require('../collections/postsDatabase.js');
const {getAccessToken} = require('../modules/tokenHandler.js');

function collectData(req) {
  return {
    token: req.header('Authorization'),
    postText: req.body.postText,
  };
}

function newPostHandler(req, res, postInfo) {
  insertDocumentBy(postInfo, function(err, item) {
    if (err) {
      res.status(HTTP_STATUSES.SERVER_ERROR)
        .json({'errorType': 'ServerError'});
    } else {
      res.setHeader('Content-Type', 'application/json');
      /* eslint no-magic-numbers: ["error", { "ignoreArrayIndexes": true }]*/
      res.setHeader('Location', '/post/' + item.ops[0]._id);
      res.status(HTTP_STATUSES.CREATED).json();
    }
  });
}

function dataValidation(req, res, postInfo) {
  if (req.header('content-type').toLowerCase() !== 'application/json') {
    return {'status': HTTP_STATUSES.BAD_REQUEST, 'errorType': 'ContentType'};
  } else if (req.header('Authorization') === null) {
    return {'status': HTTP_STATUSES.UNAUTHORIZED, 'errorType': 'Unauthorized'};
  } else if (req.body.postText === null) {
    return {'status': HTTP_STATUSES.BAD_REQUEST, 'errorType': 'FieldsMissing'};
  }
  return true;
}

function createNewPost(req, res) {
  let postInfo = collectData(req);

  let validationResult = dataValidation(req, res, postInfo);

  if (validationResult === true) {
    getAccessToken(postInfo.token, function(err, item) {
      if (err) {
        res.status(HTTP_STATUSES.SERVER_ERROR)
          .json({'errorType': 'server error'});
        return;
      }
      postInfo.token = item.userId;
      newPostHandler(req, res, postInfo);
    });
  } else {
    res.status(validationResult.status)
      .json({'errorType': validationResult.errorType});
  }
}

module.exports = {createNewPost: createNewPost};
