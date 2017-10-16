'use strict';

require('dotenv').config();

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
 * @param {Function} operation
 * @param {Function} callback
 *
 * @return {undefined}
 */
function connectMongoTo(operation, callback) {
  MongoClient.connect(MONGO_URL, (err, db) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to connect: ', err);
      db.close();
      callback(err, null);
      return;
    }
    operation(db);
  });
}

/**
 *
 * @param {Db}       db
 * @param {Object}   filters
 * @param {Function} callback
 *
 * @return {undefined}
 */
function retrieveDocument(db, filters, callback) {
  db.collection('tokens').findOne(filters, (err, item) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to retrieve tokens: ', err);
    }
    db.close();
    callback(err, item);
  });
}

/**
 *
 * @param {Db}       db
 * @param {Object}   tokenDescriptor
 * @param {Function} callback
 *
 * @return {undefined}
 */
function insertDocument(db, tokenDescriptor, callback) {
  db.collection('tokens').insert(tokenDescriptor, (err, item) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to insert token: ', err);
    }
    db.close();
    callback(err, item);
  });
}

/**
 *
 * @param {Db}       db
 * @param {Obejct}   filter
 * @param {Function} callback
 *
 * @return {undefined}
 */
function deleteDocument(db, filter, callback) {
  db.collection('tokens').remove(filter, (err, res) => {
    if (err !== null) {
      console.log('[MONGO ERROR] Unable to delete token: ', err);
    }
    db.close();
    callback(err, res.result.ok === 1);
  });
}

module.exports = {
  /**
   *
   * @param {Object}     tokenDescriptor
   * @param {Function}   callback
   *
   * @return {undefined}
   */
  insertDocument: (tokenDescriptor, callback) => {
    connectMongoTo((db) => {
      insertDocument(db, tokenDescriptor, callback);
    });
  },
  /**
   *
   * @param {string}     token
   * @param {Function}   callback
   *
   * @return {undefined}
   */
  deleteDocumentByToken: (token, callback) => {
    connectMongoTo((db) => {
      deleteDocument(db, {'token': token}, callback);
    });
  },
  /**
   *
   * @param {string}   userId
   * @param {string}   userAgent
   * @param {Function} callback
   *
   * @return {undefined}
   */
  getDocumentByUserData: (userId, userAgent, callback) => {
    connectMongoTo((db) => {
      retrieveDocument(
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
   * @return {undefined}
   */
  getDocumentByToken: (token, callback) => {
    connectMongoTo((db) => {
      retrieveDocument(
        db,
        {'token': token},
        callback
      );
    });
  },
};
