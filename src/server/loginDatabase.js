const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_URL;
const Cryptr = require('cryptr');
const cryptr = new Cryptr('jiaMi');

function checkUserInfo(email, password) {
  console.log(encrypted);
  MongoClient.connect(url, function(err, db, password) {
    db.collection('users').findOne({email: email}, function(err, obj, password) {      
      let encrypted = cryptr.encrypt(password);
      if (obj !== null && obj.password === encrypted) {
        return true;
      } else {
        return false;
      }
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
  checkUserInfo: checkUserInfo,
};
