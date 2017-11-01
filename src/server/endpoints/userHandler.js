'use strict';

const HTTP_STATUSES = require('../modules/httpStatuses');
const usersCollection = require('../collections/usersDatabase');
const {getAccessToken} = require('../modules/tokenHandler');

function getUserInfo(req, res) {
  if (req.query.username !== undefined) {
    usersCollection.retrieveUserByUsername(req.query.username, (result) => {
      let user = {
        'username': result.username,
        'email': result.email,
        'phonenumber': result.phonenumber,
        'fullname': result.fullname,
        'userPicURL': result.userPicURL,
      };

      res.status(HTTP_STATUSES.OK).json({userInfo: user});
    });
  } else {
    let token = req.header('Authorization');

    if (token === null) {
      res.status(HTTP_STATUSES.UNAUTHORIZED)
        .json({'errorType': 'Unauthorized'});
      return;
    }

    getAccessToken(token, function(err, tokenDescriptor) {
      if (err) {
        res.status(HTTP_STATUSES.SERVER_ERROR)
          .json({'errorType': 'server error'});
        return;
      }
      if (tokenDescriptor === null) {
        res.status(HTTP_STATUSES.UNAUTHORIZED)
          .json({'errorType': 'Unauthorized'});
        return;
      }

      usersCollection.findUsername(tokenDescriptor.userId, (result) => {
        let user = {
          'username': result.username,
          'email': result.email,
          'phonenumber': result.phonenumber,
          'fullname': result.fullname,
          'userPicURL': result.userPicURL,
        };

        res.status(HTTP_STATUSES.OK).json({info: user});
      });
    });
  }
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

function setProfileImg(req, res) {
  console.log('gggg');
  console.log(req.body.imgURL);
  getAccessToken(req.header('Authorization'), function(err, item) {
    handleDBError(res, err, item);
    // item.userId;
    console.log('1: ', req.body.imgURL);
    usersCollection.updateProfileImg(item.userId, req, res);
  });
}

module.exports = {
  getUserInfo: getUserInfo,
  setProfileImg: setProfileImg,
};
