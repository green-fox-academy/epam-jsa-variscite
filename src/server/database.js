const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/MyDb';

function checkUserInfo(email, password) {
  MongoClient.connect(url, function(err, db) {
    db.collection('users').findOne({email: email}, function(err, obj) {
      if (obj !== null && obj.password === password) {
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
