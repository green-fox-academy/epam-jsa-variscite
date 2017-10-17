'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_URL;
const Cryptr = require('cryptr');
const cryptr = new Cryptr('jiaMi');
const tokenHandler = require('../modules/tokenHandler.js');
const HTTP_STATUSES = require('./modules/httpStatuses');

function checkInfo(obj, userAgent, password, res) {
  if (obj !== null && obj.password === cryptr.encrypt(password)) {
    tokenHandler.createAccessToken(obj._id,
      userAgent, function(err, tokenDescriptor) {
        let tokenObj = {
          'token': tokenDescriptor.token,
          'expiresAt': tokenDescriptor.expiresAt,
        };
        res.status(HTTP_STATUSES.OK).json(tokenObj);
      });
  } else {
    res.status(HTTP_STATUSES.FORBIDDEN).json({'errorType': 'MisMatch'});
  }
}

function retrieveUserInfo(db, userAgent, email, password, res) {
  db.collection('users').findOne({email: email}, (err, obj) => {
    if (err !== null) {
      console.log('Couldn\'t get element from the db', err);
      return;
    }
    checkInfo(obj, userAgent, password, res);
  });
}

function checkUserInfo(userAgent, email, password, res) {
  MongoClient.connect(url, (err, db) => {
    if (err !== null) {
      console.log('Couldn\'t get connect to the db', err);
      return;
    }
    retrieveUserInfo(db, userAgent, email, password, res);
  });
}

function sendStatus(req, res) {
  let objectId = req._id;
  res.set('location', '/api/signup/' + objectId);
  res.status(HTTP_STATUSES.CREATED).json();
  return;
}

function insertUser(db, req, res) {
  db.collection('users').insert(req, function(err) {
    if (err) {
      res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
      console.log('Couldn\'t insert the element into the db', err);
      return;
    }
    sendStatus(req, res);
  });
}

function handleEmailError(db, res) {
  res.status(HTTP_STATUSES.CONFLICT).json({errorType: 'emailError'});
  db.close();
}

function handleUsernameError(db, res) {
  res.status(HTTP_STATUSES.CONFLICT).json({errorType: 'usernameError'});
  db.close();
}

function handlePhonenumberError(db, res) {
  res.status(HTTP_STATUSES.CONFLICT).json({errorType: 'phoneError'});
  db.close();
}

function handleError(db, item, req, res) {
  if (item.email === req.email) {
    handleEmailError(db, res);
  } else if (item.username === req.username && item.username !== '') {
    handleUsernameError(db, res);
  } else if (item.phonenumber === req.phonenumber) {
    handlePhonenumberError(db, res);
  }
}

function checkField(db, item, req, res) {
  if (item === null) {
    insertUser(db, req, res);
  } else {
    handleError(db, item, req, res);
  }
}

function findUser(db, req, res) {
  db.collection('users').findOne(
    {
      $or: [
        {$and: [{'username': req.username}, {'username': {$ne: ''}}]},
        {'email': req.email},
        {$and: [{'phonenumber': req.phonenumber}, {'phonenumber': {$ne: ''}}]},
      ],
    },
    (err, item) => {
      if (err) {
        console.log('Couldn\'t get element from the db', err);
        res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
        return;
      }
      checkField(db, item, req, res);
    }
  );
}

function signUp(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
      console.log('Couldn\'t get connect to the db', err);
      return;
    }
    findUser(db, req, res);
  });
}

module.exports = {
  checkUserInfo: checkUserInfo,
  signUp: signUp,
};
