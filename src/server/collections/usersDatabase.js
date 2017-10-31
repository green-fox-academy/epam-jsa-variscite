'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = process.env.DB_URL;
const Cryptr = require('cryptr');
const cryptr = new Cryptr('jiaMi');
const tokenHandler = require('../modules/tokenHandler.js');
const HTTP_STATUSES = require('../modules/httpStatuses');

function checkInfo(obj, userAgent, password, res) {
  if (obj !== null && obj.password === cryptr.encrypt(password)) {
    tokenHandler.createAccessToken(obj._id.toString(),
      userAgent, function(err, tokenDescriptor) {
        if (err !== null) {
          console.log('[MONGO ERROR] Unable to generate token: ', err);
        }
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

function sendStatus(user, req, res) {
  let objectId = user._id;
  let userAgent = req.header('user-agent').toLowerCase();

  res.set('location', '/api/signup/' + objectId);
  tokenHandler.createAccessToken(objectId.toString(),
    userAgent, function(err, tokenDescriptor) {
      if (err !== null) {
        console.log('[MONGO ERROR] Unable to generate token: ', err);
      }
      let tokenObj = {
        'token': tokenDescriptor.token,
        'expiresAt': tokenDescriptor.expiresAt,
      };

      res.status(HTTP_STATUSES.CREATED).json(tokenObj);
    });
  return;
}

function insertUser(db, user, req, res) {
  db.collection('users').insert(user, function(err) {
    if (err) {
      res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
      console.log('Couldn\'t insert the element into the db', err);
      return;
    }
    sendStatus(user, req, res);
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

function handleError(db, item, user, req, res) {
  if (item.email === user.email) {
    handleEmailError(db, res);
  } else if (item.username === user.username && item.username !== '') {
    handleUsernameError(db, res);
  } else if (item.phonenumber === user.phonenumber) {
    handlePhonenumberError(db, res);
  }
}

function checkField(db, item, user, req, res) {
  if (item === null) {
    insertUser(db, user, req, res);
  } else {
    handleError(db, item, user, req, res);
  }
}

function findUser(db, user, req, res) {
  db.collection('users').findOne(
    {
      $or: [
        {$and: [{'username': user.username}, {'username': {$ne: ''}}]},
        {'email': user.email},
        {$and: [{'phonenumber': user.phonenumber}, {'phonenumber': {$ne: ''}}]},
      ],
    },
    (err, item) => {
      if (err) {
        console.log('Couldn\'t get element from the db', err);
        res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
        return;
      }
      checkField(db, item, user, req, res);
    }
  );
}

function signUp(user, req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.status(HTTP_STATUSES.SERVER_ERROR).json({errorType: 'serverError'});
      console.log('Couldn\'t get connect to the db', err);
      return;
    }
    findUser(db, user, req, res);
  });
}

function retrieveUser(db, id, callback) {
  id = new ObjectId(id);
  db.collection('users').findOne({_id: id}, (err, result) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to retrieve friends: ', err);
    }
    db.close();
    callback(result);
  });
}

function findUsername(id, callback) {
  MongoClient.connect(url, (err, db) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to connect to db: ', err);
      return;
    }

    retrieveUser(db, id, callback);
  });
}

function retrieveUserByUsername(username, callback) {
  MongoClient.connect(url, (err, db) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to connect to db: ', err);
      return;
    }

    db.collection('users').findOne({username: username}, (err, result) => {
      if (err !== null) {
        console.log('[MONGO ERROR] Unable to retrieve user: ', err);
      }
      db.close();
      callback(err, result);
    });
  });
}

module.exports = {
  checkUserInfo: checkUserInfo,
  signUp: signUp,
  findUsername: findUsername,
  retrieveUserByUsername: retrieveUserByUsername,
};
