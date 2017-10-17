'use strict';

require('dotenv').config();
const mongodb = require('mongodb');

function heartbeat(req, res) {
  let MongoClient = mongodb.MongoClient;
  let url = process.env.DB_URL;

  MongoClient.connect(url, function(err, db) {
    if (err !== null) {
      console.log('Couldn\'t get connect to the db', err);
      return;
    }
    let adminDb = db.admin();

    adminDb.serverStatus(function(err, info) {
      if (err !== null) {
        return;
      }
      console.log(info.version);
      res.json(info.version);
      db.close();
    });
  });
}

module.exports = {heartbeat: heartbeat};
