const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_URL;
const Cryptr = require('cryptr');
const cryptr = new Cryptr('jiaMi');
const tokenHandler = require('./modules/tokenHandler.js');

function checkUserInfo(userAgent, email, password, res) {
  MongoClient.connect(url, function(err, db) {
    db.collection('users').findOne({email: email}, function(err, obj) {
      let encrypted = cryptr.encrypt(password);
      console.log(encrypted);
      if (obj !== null && obj.password === encrypted) {
        tokenHandler.createAccessToken(obj._id,
          userAgent, function(err, tokenDescriptor) {
            let obj = {
              'token': tokenDescriptor.token,
              'expiresAt': tokenDescriptor.expiresAt,
            };
            res.status(200).json(obj);
          });
      } else {
        res.status(403).json({'errorType': 'MisMatch'});
      }
      db.close();
    });
  });
}

module.exports= {
  checkUserInfo: checkUserInfo,
};
