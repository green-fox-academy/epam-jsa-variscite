'use strict';

const HTTP_STATUSES = require('../modules/httpStatuses');
const {insertDocumentByID} = require('../collections/postsDatabase.js');

function collectData(req) {
  return {
    userID: req.header('Authorization'),
    postText: req.body.postText,
  };
}

function newPostErrorHandler(req, res, postInfo) {
  if (req.header('content-type').toLowerCase() !== 'application/json') {
    res.status(HTTP_STATUSES.BAD_REQUEST).json({'errorType': 'ContentType'});
    return;
  } else if (req.header('Authorization') === null) {
    res.status(HTTP_STATUSES.UNAUTHORIZED).json({'errorType': 'Unauthorized'});
    return;
  } else if (req.body.postText === null) {
    res.status(HTTP_STATUSES.FORBIDDEN).json({'errorType': 'FieldsMissing'});
  } else {
    insertDocumentByID(postInfo, function(err, response) {
      if (err) {
        res.status(HTTP_STATUSES.SERVER_ERROR).json({'errorType': 'ServerError'});
      } else {
        res.setHeader('Content-Type', 'application/json');
        // res.setHeader('Location', '')
        console.log('good');
        res.status(HTTP_STATUSES.NO_CONTENT).json();
      }
    });
    return;
  }
}

function createNewPost(req, res) {
  let postInfo = collectData(req);

  newPostErrorHandler(req, res, postInfo);
  // hbgeuy65644
  // header -> Location /posts/hbgeuy65644
  // status -> 201
}

module.exports = {createNewPost: createNewPost};
