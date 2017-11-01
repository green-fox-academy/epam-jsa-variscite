'use strict';

const HTTP_STATUSES = require('../modules/httpStatuses');
const postsCollection = require('../collections/postsDatabase');
const friendsCollection = require('../collections/friendsDatabase');
const usersCollection = require('../collections/usersDatabase');
const {getAccessToken} = require('../modules/tokenHandler');

function findPosts(array, res) {
  postsCollection.findPosts(array, (err, result)=> {
    if (err !== null) {
      res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
      return;
    }

    if (result !== null) {
      let data = [];

      result.forEach(function(val) {
        val.numOfComments = val.comments.length;
        val.numOfLikes = val.likes.length;
        val.numOfShares = val.shares.length;
        data = data.concat(val);
        data = data.concat(val.shares.map(function(item) {
          let newVal = Object.assign({}, val);
          let newUserName = [];

          newUserName.push(item.userName, val.username);
          newVal.username = newUserName;
          newVal.originTimeStamp = newVal.timeStamp;
          newVal.timeStamp = item.timeStamp;
          newVal.newUserPicURL = item.userPicURL;
          return newVal;
        }));
      });

      let obj = {post: data};

      res.status(HTTP_STATUSES.OK).json(obj);
    } else {
      res.status(HTTP_STATUSES.OK).json({});
    }
  });
}

function collectData(req) {
  return {
    token: req.header('Authorization'),
    postText: req.body.postText,
    username: '',
    postPicURL: req.body.imgURL,
  };
}

function newPostHandler(req, res, postInfo) {
  postsCollection.insertDocument(postInfo, function(err, item) {
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

function findAllPosts(id, item, req, res) {
  if (item !== null && (req.query === undefined || req.query.author !== 'me')) {
    let users = item.userFriends;

    users.push(item.userId);
    findPosts(users, res);
  } else {
    let user = [id];

    findPosts(user, res);
  }
}

function findUserFriends(tokenDescriptor, req, res) {
  let userId = tokenDescriptor.userId;

  friendsCollection.findFriends(userId, (err, userId, item) => {
    if (err !== null) {
      res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
      return;
    }
    findAllPosts(userId, item, req, res);
  });
}

function displayPosts(req, res) {
  if (req.query !== undefined && req.query.username !== undefined) {
    usersCollection.retrieveUserByUsername(req.query.username, (result) => {
      let user = [result._id];

      findPosts(user, res);
    });
  } else {
    let token = req.header('Authorization');

    if (token === null) {
      res.status(HTTP_STATUSES.UNAUTHORIZED)
        .json({'errorType': 'Unauthorized'});
      return;
    }

    getAccessToken(token, (err, tokenDescriptor) => {
      if (err !== null) {
        res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
        return;
      }
      if (tokenDescriptor === null) {
        res.status(HTTP_STATUSES.UNAUTHORIZED).json({errorType: 'loginError'});
        return;
      }
      findUserFriends(tokenDescriptor, req, res);
    });
  }
}

function dataValidation(req, res, postInfo) {
  if (req.header('content-type').toLowerCase() !== 'application/json') {
    return {'status': HTTP_STATUSES.BAD_REQUEST, 'errorType': 'ContentType'};
  } else if (req.header('Authorization') === undefined) {
    return {'status': HTTP_STATUSES.UNAUTHORIZED, 'errorType': 'Unauthorized'};
  } else if (req.body.postText === null) {
    return {'status': HTTP_STATUSES.BAD_REQUEST, 'errorType': 'FieldsMissing'};
  }
  return true;
}

function validationForOperation(req) {
  if (req.header('content-type').toLowerCase() !== 'application/json') {
    return {'status': HTTP_STATUSES.BAD_REQUEST, 'errorType': 'ContentType'};
  } else if (req.header('Authorization') === undefined) {
    return {'status': HTTP_STATUSES.UNAUTHORIZED, 'errorType': 'Unauthorized'};
  }
  return true;
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

function like(req, res) {
  let id = req.params.id;
  let validationResult = validationForOperation(req);

  if (validationResult === true) {
    let token = req.header('authorization');

    getAccessToken(token, function(err, item) {
      handleDBError(res, err, item);
      usersCollection.findUsername(item.userId, (result) => {
        postsCollection.likePost(id, result.username, function(data) {
          if (data === null) {
            res.status(HTTP_STATUSES.SERVER_ERROR)
              .json({'errorType': 'server error'});
            return;
          }
          res.status(HTTP_STATUSES.OK).json({
            numberOfLikes: data.likes,
            isUserLiked: data.isUserLiked,
          });
        });
      });
    });
  } else {
    res.status(validationResult.status)
      .json({'errorType': validationResult.errorType});
  }
}

function share(req, res) {
  let id = req.params.id;
  let validationResult = validationForOperation(req);

  if (validationResult === true) {
    let token = req.header('authorization');

    getAccessToken(token, function(err, item) {
      handleDBError(res, err, item);
      usersCollection.findUsername(item.userId, (result) => {
        postsCollection.sharePost(id, result.username,
          result.userPicURL, function(data) {
            if (data === null) {
              res.status(HTTP_STATUSES.SERVER_ERROR)
                .json({'errorType': 'server error'});
              return;
            }
          });
      });
      findUserFriends(item, req, res);
    });
  } else {
    res.status(validationResult.status)
      .json({'errorType': validationResult.errorType});
  }
}

function createNewPost(req, res) {
  let postInfo = collectData(req);

  let validationResult = dataValidation(req, res, postInfo);

  if (validationResult === true) {
    getAccessToken(postInfo.token, function(err, item) {
      handleDBError(res, err, item);
      postInfo.token = item.userId;

      usersCollection.findUsername(item.userId, (result) => {
        postInfo.username = result.username;
        newPostHandler(req, res, postInfo);
      });
    });
  } else {
    res.status(validationResult.status)
      .json({'errorType': validationResult.errorType});
  }
}

function deletePost(req, res) {
  let id = req.params.id;
  let sharedUser = req.query.sharedByUser;
  let validationResult = validationForOperation(req);

  if (validationResult) {
    postsCollection.deletePost(id, sharedUser, (err) => {
      if (err !== null) {
        res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
        return;
      }
      res.status(HTTP_STATUSES.OK).json({});
    });
  }
}

module.exports = {
  createNewPost: createNewPost,
  displayPosts: displayPosts,
  like: like,
  share: share,
  deletePost: deletePost,
};
