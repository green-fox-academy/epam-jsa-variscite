'use strict'

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = process.env.DB_URL;

function signUp(req, res){
	MongoClient.connect(url, function (err, db) {
    let variscite = db.collection('variscite');
		// let info = {
		// 	'userName': req.userName,
		// 	'email': req.email,
		// 	'phoneNumber': req.phoneNumber,
		// 	'fullName': req.fullName,
		// 	'password': req.password
		// }
    if (err) {
      res.status(500).send({errorType:'serverError'});
      db.close();
      return;
    }
    variscite.find({$or: [
      {'userName': req.username},
      {'email': req.email},
      {'phoneNumber': req.phoneNumber},
    ]}).toArray(function(err, items) {
      if (items.length === 0) {
        variscite.insert(req, function() {
          let objectId = req._id;
          res.set('location', '/api/signup/'+objectId);
          res.status(201).send({errorType: 'none'});
          db.close();
          return;
        });
      } else if (items[0].userName === req.userName) {
        res.status(409).send({errorType: 'usernameError'});
        db.close();
        return;
      } else if (items[0].email === req.email) {
        console.log(1);
        res.status(409).send({errorType: 'emailError'});
        db.close();
        return;
      } else if (items[0].phoneNumber === req.phoneNumber) {
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
