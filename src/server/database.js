'use strict'

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = process.env.DB_URL;

function signUp(req, res){
	MongoClient.connect(url, function (err, db) {
    let variscite = db.collection('variscite');

    if (err) {
      res.status(500).send({errorType:'serverError'});
      db.close();
      return;
    }
    variscite.findOne({
      $or: [
      {$and:[{'username': req.username}, {'username': {$ne: ''}}]},
      {'email': req.email},
      {$and:[{'phonenumber': req.phonenumber}, {'phonenumber': {$ne: ''}}]},
    ]}, function(err, item) {
      console.log(item);
      if (err) {
        res.status(500).send({errorType:'serverError'});
        db.close();
        return;
      }
      if (item === null) {
        variscite.insert(req, function() {
          let objectId = req._id;
          res.set('location', '/api/signup/'+objectId);
          res.status(201).send();
          db.close();
          return;
        });
      } else if (item.email === req.email) {
        console.log('emailError');
        res.status(409).send({errorType: 'emailError'});
        db.close();
        return;
      } else if (item.username === req.username) {
        console.log('usernameError');
        res.status(409).send({errorType: 'usernameError'});
        db.close();
        return;
      } else if (item.phonenumber === req.phonenumber) {
        console.log('phoneError');
        res.status(409).send({errorType: 'phoneError'});
        db.close();
        return;
      }
    });
	});
}

module.exports = {
  signUp: signUp,
};
