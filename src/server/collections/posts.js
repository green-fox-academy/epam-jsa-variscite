'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_URL;

function findPosts(filter) {
  MongoClient.connect(url, (err, db) => {
    if (err !== null) {
      return;
    }
    retrievePosts(db,filter);
  });
}

function retrievePosts(db, filter) {
  db.collection('posts').find(filter, (err, item) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to retrieve friends: ', err);
    }
    db.close();
    
  });
}

module.exports = {findPosts: findPosts};
