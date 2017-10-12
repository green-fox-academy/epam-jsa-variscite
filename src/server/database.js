const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/MyDb";

function checkUserInfo(email, password) {
  MongoClient.connect(url, function (err, db) {
    db.collection("variscite").findOne({email:email}, function(err, obj) {
      if(obj !== null && obj.password === password) {
      	return true;
      } else {
      	return false;
      }
    });  
  });
}

module.exports= {
  checkUserInfo: checkUserInfo,
};