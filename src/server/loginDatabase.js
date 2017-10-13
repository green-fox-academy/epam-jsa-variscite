const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_URL;
const Cryptr = require('cryptr');
const cryptr = new Cryptr('jiaMi');

function checkUserInfo(email, password, res) {
  console.log(password);
  MongoClient.connect(url, function(err, db) {
    console.log(password);
    db.collection('users').findOne({email: email}, function(err, obj) {  
      console.log(password);    
      let encrypted = cryptr.encrypt(password);
      console.log(encrypted);
      if (obj !== null && obj.password === encrypted) {
        res.status(200).json({'msg': 'success'});
        db.close();
        return;
      } else {
        res.status(403).json({'errorType': 'MisMatch'});
        db.close();
        return;
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
