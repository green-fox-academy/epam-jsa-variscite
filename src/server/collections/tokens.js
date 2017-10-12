'use strict';

require('dotenv').config()

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

/**
 * URL of mongo instance
 *
 * @var {string}
 */
const MONGO_URL = process.env.DB_URL;

/**
 *
 * @param {Db}       db
 * @param {Object}   filters
 * @param {Function} callback
 *
 * @returns {undefined}
 */
function getDocument(db, filters, callback) {
  db.collection('tokens').findOne(filters, (err, item) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to retrieve tokens: ', err);
    }
    db.close();
    callback(item);
  });
}

/**
 *
 * @param {Db}       db
 * @param {Object}   tokenDescriptor
 * @param {Function} callback
 *
 * @returns {undefined}
 */
function insertDocument(db, tokenDescriptor, callback) {
  db.collection('tokens').insert(tokenDescriptor, (err, item) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to insert token: ', err);
    }
    db.close();
    callback(item);
  });
}

/**
 *
 * @param {Db}       db
 * @param {Obejct}   filter
 * @param {Function} callback
 *
 * @returns {undefined}
 */
function deleteDocument(db, filter, callback) {
  db.collection('tokens').remove(filter, (err) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to delete token: ', err);
    }
    db.close();
    callback(err !== null ? true : null);
  });
}

module.exports = {
  /**
   *
   * @param {Object}     tokenDescriptor
   * @param {Function}   callback
   *
   * @returns {undefined}
   */
  insertDocument: (tokenDescriptor, callback) => {
    MongoClient.connect(MONGO_URL, (err, db) => {
      if(err !== null) {
        console.log('[MONGO ERROR] Unable to connect: ', err);
        db.close();
        callback(null);
        return;
      }

      insertDocument(db, tokenDescriptor, callback);
    });
  },
  /**
   *
   * @param {string}     token
   * @param {Function}   callback
   *
   * @returns {undefined}
   */
  deleteDocumentByToken: (token, callback) => {
    MongoClient.connect(MONGO_URL, (err, db) => {
      if(err !== null) {
        console.log('[MONGO ERROR] Unable to connect: ', err);
        db.close();
        callback(null);
        return;
      }

      deleteDocument(db, {'token': token}, callback);
    });
  },
  /**
   *
   * @param {string}   userId
   * @param {string}   userAgent
   * @param {Function} callback
   *
   * @returns {undefined}
   */
  getDocumentByUserData: (userId, userAgent, callback) => {
    MongoClient.connect(MONGO_URL, (err, db) => {
      if(err !== null) {
        console.log('[MONGO ERROR] Unable to connect: ', err);
        db.close();
        callback(null);
        return;
      }

      getDocument(
        db,
        {$and: [{'userId': userId}, {'userAgent': userAgent}]},
        callback
      );
    });
  },
  /**
   *
   * @param {string}     token
   * @param {Function}   callback
   *
   * @returns {undefined}
   */
  getDocumentByToken: (token, callback) => {
    MongoClient.connect(MONGO_URL, (err, db) => {
      if(err !== null) {
        console.log('[MONGO ERROR] Unable to connect: ', err);
        db.close();
        callback(null);
        return;
      }

      getDocument(
        db,
        {'token': token},
        callback
      );
    });
  }
};