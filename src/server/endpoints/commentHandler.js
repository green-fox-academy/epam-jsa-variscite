'use strict';

const HTTP_STATUSES = require('../modules/httpStatuses');
const {getAccessToken} = require('../modules/tokenHandler');
const usersCollection = require('../collections/usersDatabase');
const postsCollection = require('../collections/postsDatabase');

function collectData(req) {
  return {
    token: req.header('Authorization'), // user_id
    commentText: req.body.text,
    postId: req.body._id,
    username: '',
  };
}

function dataValidation(req, res, commentText) {
  if (req.header('content-type').toLowerCase() !== 'application/json') {
    return {'status': HTTP_STATUSES.BAD_REQUEST, 'errorType': 'ContentType'};
  } else if (req.header('Authorization') === undefined || !req.header('Authorization')) {
    return {'status': HTTP_STATUSES.BAD_REQUEST, 'errorType': 'Unauthorized'};
  } else if (req.body.commentText === null) {
    return {'status': HTTP_STATUSES.BAD_REQUEST, 'errorType': 'FieldsMissing'};
  } else if (req.body._id === null) {
    return {'status': HTTP_STATUSES.BAD_REQUEST, 'errorType': 'PostMissing'};
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
      // res.setHeader('Location', '/post/comment/' + item.ops[0]._id);
      // console.log('item: ', info);
      res.status(HTTP_STATUSES.CREATED).json(info);
    }
  });
}

function createComment(req, res) {
  console.log(req.body);
  let commentInfo = collectData(req);

  let validationResult = dataValidation(req, res, commentInfo);

  if (validationResult === true) {
    getAccessToken(commentInfo.token, function(err, item) {
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
      commentInfo.token = item.userId;

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

// //////////////////////////////////////

function findAllComments(req, res) {
  postsCollection.findComments(req.params.id, function(err, result) {
    if (err) throw err;
    // console.log('re: ', result.comments);
    res.json(result[0].comments);
  });
}

module.exports = {
  createComment: createComment,
  findAllComments: findAllComments,
};
