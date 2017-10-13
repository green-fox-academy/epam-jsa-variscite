const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_URL;
const Cryptr = require('cryptr');
const cryptr = new Cryptr('jiaMi');

function getUserInfo(email) {
  MongoClient.connect(url, function(err, db) {
    db.collection('users').findOne({email: email}, function(err, obj) {   
      return obj.password;
    });
  });
}

function getUserId(email) {
  MongoClient.connect(url, function(err, db) {
    db.collection('users').findOne({email: email}, function(err, obj) {
      return obj._id;
    });
  });
}

module.exports= {
  getUserInfo: getUserInfo,
};
