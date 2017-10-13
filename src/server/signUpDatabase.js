'use strict';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = process.env.DB_URL;

function signUp(req, res) {
  MongoClient.connect(url, function(err, db) {
    let users = db.collection('users');

    /* eslint no-console: 'off' */
    if (err) {
      res.status(500).json({errorType: 'serverError'});
      console.log('Couldn\'t get connect to the db', err);
      db.close();
      return;
    }
    users.findOne({
      $or: [
        {$and: [{'username': req.username}, {'username': {$ne: ''}}]},
        {'email': req.email},
        {$and: [{'phonenumber': req.phonenumber}, {'phonenumber': {$ne: ''}}]},
      ]}, function(err, item) {
      if (err) {
        res.status(500).json({errorType: 'serverError'});
        console.log('Couldn\'t get element from the db', err);
        db.close();
        return;
      }
      if (item === null) {
        users.insert(req, function() {
          if (err) {
            res.status(500).json({errorType: 'serverError'});
            console.log('Couldn\'t insert the element into the db', err);
            db.close();
            return;
          }
          let objectId = req._id;
          res.set('location', '/api/signup/' + objectId);
          res.status(201).json();
          db.close();
          return;
        });
      } else if (item.email === req.email) {
        res.status(409).json({errorType: 'emailError'});
        db.close();
        return;
      } else if (item.username === req.username && item.username !== '') {
        res.status(409).json({errorType: 'usernameError'});
        db.close();
        return;
      } else if (item.phonenumber === req.phonenumber) {
        res.status(409).json({errorType: 'phoneError'});
        db.close();
        return;
      }
    });
  });
}

module.exports = {
  signUp: signUp,
};
