'use strict';

const HTTP_STATUSES = require('../modules/httpStatuses');
const usersCollection = require('../collections/usersDatabase');
const friendsCollection = require('../collections/friendsDatabase');
const {getAccessToken} = require('../modules/tokenHandler');

function getUserInfo(req, res) {
  if (req.query.username !== undefined) {
    usersCollection.retrieveUserByUsername(req.query.username, (err, result) => {
      let token = req.header('Authorization');
      if (err) {
        res.status(HTTP_STATUSES.SERVER_ERROR)
          .json({'errorType': 'server error'});
        return;
      }
      if (result === null) {
        res.status(HTTP_STATUSES.BAD_REQUEST)
          .json({'errorType': 'No Such User'});
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
        usersCollection.findUsername(tokenDescriptor.userId, (visitor) => {
          if (err) {
            res.status(HTTP_STATUSES.SERVER_ERROR)
              .json({'errorType': 'server error'});
            return;
          }
          if (visitor === null) {
            res.status(HTTP_STATUSES.BAD_REQUEST)
              .json({'errorType': 'No Such User'});
            return;
          }
          friendsCollection.checkIsFriend(visitor._id, result._id, (item) => {
            if (err) {
              res.status(HTTP_STATUSES.SERVER_ERROR)
                .json({'errorType': 'server error'});
              return;
            }
            if (item === null) {
              res.status(HTTP_STATUSES.BAD_REQUEST)
                .json({'errorType': 'No Such User'});
              return;
            }
            let user = {
              'username': result.username,
              'email': result.email,
              'phonenumber': result.phonenumber,
              'fullname': result.fullname,
              'isFriend': item,
            };
            res.status(HTTP_STATUSES.OK).json({info: user});
          });
        });
      });
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
        };

        res.status(HTTP_STATUSES.OK).json({info: user});
      });
    });
  }
}

module.exports = {getUserInfo: getUserInfo};
