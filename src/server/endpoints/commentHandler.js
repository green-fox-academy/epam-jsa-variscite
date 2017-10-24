'use strict';

const HTTP_STATUSES = require('../modules/httpStatuses');
const {getAccessToken} = require('../modules/tokenHandler');
const usersCollection = require('../collections/usersDatabase');
const postsCollection = require('../collections/postsDatabase');

function collectData(req) {
  return {
    token: req.header('Authorization'),
    commentText: req.body.text,
    postId: req.params.id,
    userPicURL: req.body.userPicURL,
    userId: '',
    username: '',
  };
}

function dataValidation(req, res, commentText) {
  if (req.header('content-type').toLowerCase() !== 'application/json') {
    return {'status': HTTP_STATUSES.BAD_REQUEST, 'errorType': 'ContentType'};
  } else if (req.header('Authorization') === undefined || !req.header('Authorization')) {
    return {'status': HTTP_STATUSES.BAD_REQUEST, 'errorType': 'HeaderMissing '};
  } else if (req.body.commentText === null) {
    return {'status': HTTP_STATUSES.BAD_REQUEST, 'errorType': 'FieldsMissing'};
  }
  return true;
}

function commentHandler(req, res, commentInfo) {
  postsCollection.insertComment(commentInfo, function(err, info) {
    if (err) {
      res.status(HTTP_STATUSES.SERVER_ERROR)
        .json({'errorType': 'ServerError'});
    } else {
      res.setHeader('Content-Type', 'application/json');
      /* eslint no-magic-numbers: ["error", { "ignoreArrayIndexes": true }]*/
      res.status(HTTP_STATUSES.CREATED).json(info);
    }
  });
}

function handleDBError(res, err, item) {
  if (err) {
    res.status(HTTP_STATUSES.SERVER_ERROR).json({'errorType': 'server error'});
    return;
  }
  if (item === null) {
    res.status(HTTP_STATUSES.UNAUTHORIZED).json({'errorType': 'Unauthorized'});
    return;
  }
}

function createComment(req, res) {
  let commentInfo = collectData(req);

  let validationResult = dataValidation(req, res, commentInfo);

  if (validationResult === true) {
    getAccessToken(commentInfo.token, function(err, item) {
      handleDBError(res, err, item);

      commentInfo.userId = item.userId;
      delete commentInfo.token;

      usersCollection.findUsername(item.userId, (result) => {
        commentInfo.username = result.username;
        commentHandler(req, res, commentInfo);
      });
    });
  } else {
    res.status(validationResult.status)
      .json({'errorType': validationResult.errorType});
  }
}

function findAllComments(req, res) {
  postsCollection.findComments(req.params.id, function(err, result) {
    if (err) {
      console.log(err);
      return;
    }
    res.status(HTTP_STATUSES.OK).json(result[0].comments);
  });
}

module.exports = {
  createComment: createComment,
  findAllComments: findAllComments,
};