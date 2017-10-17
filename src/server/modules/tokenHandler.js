'use strict';

const tokensCollection = require('../collections/tokens.js');
const randomstring = require('randomstring');

/**
 * lifetime of tokens in the system.
 * 7 days by default
 *
 * @var {number}
 */
// eslint-disable-next-line no-magic-numbers
const TOKEN_LIFETIME_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;

/**
 *
 * @param {string}   userId
 * @param {string}   userAgent
 * @param {Function} callback
 *
 * @return {undefined}
 */
function generateToken(userId, userAgent, callback) {
  tokensCollection.insertDocument(
    {
      token: randomstring.generate(),
      expiresAt: Date.now() + TOKEN_LIFETIME_IN_MILLISECONDS,
      userId: userId,
      userAgent: userAgent,
    },
    (err, result) => {
      callback(err, result !== null
        ? result.ops[0]
        : null
      );
    }
  );
}

/**
 *
 * @param {string} tokenDescriptor
 *
 * @return {boolean}
 */
function isExpiredToken(tokenDescriptor) {
  return tokenDescriptor !== null && tokenDescriptor.expiresAt <= Date.now();
}

module.exports = {
  /**
   *
   * @param {string}   userId
   * @param {string}   userAgent
   * @param {Function} callback
   *
   * @return {undefined}
   */
  createAccessToken: (userId, userAgent, callback) => {
    tokensCollection.getDocumentByUserData(
      userId,
      userAgent,
      (err, tokenDescriptor) => {
        if (tokenDescriptor !== null) {
          module.exports.deleteAccessToken(tokenDescriptor.token, () => {
            generateToken(userId, userAgent, callback);
          });
        } else {
          generateToken(userId, userAgent, callback);
        }
      });
  },
  /**
   *
   * @param {string} token
   * @param {Function} callback
   *
   * @return {undefined}
   */
  deleteAccessToken: tokensCollection.deleteDocumentByToken,
  /**
   *
   * @param {string}   token
   * @param {Function} callback
   *
   * @return {undefined}
   */
  getAccessToken: (token, callback) => {
    tokensCollection.getDocumentByToken(token, (err, tokenDescriptor) => {
      if (isExpiredToken(tokenDescriptor)) {
        module.exports.deleteAccessToken(tokenDescriptor.token,
          (err, result) => {
            callback(err, null);
          });
      } else {
        return callback(err, tokenDescriptor);
      }
    });
  },
};
