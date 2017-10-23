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
      let data = result.map(function(val) {
        val.numOfComments = val.comments.length;
        val.numOfLikes = val.likes.length;
        val.numOfShares = val.shares.length;
        return val;
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

function findAllPosts(id, item, res) {
  if (item !== null) {
    let users = item.userFriends;

    users.push(item.userId);
    findPosts(users, res);
  } else {
    let user = [id];

    findPosts(user, res);
  }
}

function findUserFriends(tokenDescriptor, res) {
  let id = tokenDescriptor.userId;

  friendsCollection.findFriends(id, (err, id, item) => {
    if (err !== null) {
      res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
      return;
    }
    findAllPosts(id, item, res);
  });
}

function displayPosts(req, res) {
  let token = req.header('Authorization');

  getAccessToken(token, (err, tokenDescriptor) => {
    if (err !== null) {
      res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
      return;
    }
    if (tokenDescriptor === null) {
      res.status(HTTP_STATUSES.UNAUTHORIZED).json({errorType: 'loginError'});
      return;
    }
    findUserFriends(tokenDescriptor, res);
  });
}

function dataValidation(req, res, postInfo) {
  if (req.header('content-type').toLowerCase() !== 'application/json') {
    return {'status': HTTP_STATUSES.BAD_REQUEST, 'errorType': 'ContentType'};
  } else if (req.header('Authorization') === null || !req.header('Authorization')) {
    return {'status': HTTP_STATUSES.UNAUTHORIZED, 'errorType': 'Unauthorized'};
  } else if (req.body.postText === null) {
    return {'status': HTTP_STATUSES.BAD_REQUEST, 'errorType': 'FieldsMissing'};
  }
  return true;
}

function like(req, res) {
  let id = req.params.id;
  let token = req.headers.authorization;
  let userName = null;
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
      userName = result.username;
      postsCollection.likePost(id, userName, function(data){
        res.status(200).json(data);
      });
    });
  });

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
      if (item === null) {
        res.status(HTTP_STATUSES.UNAUTHORIZED)
          .json({'errorType': 'Unauthorized'});
        return;
      }
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

module.exports = {
  createNewPost: createNewPost,
  displayPosts: displayPosts,
  like: like,
};
