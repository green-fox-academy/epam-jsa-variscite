'use strict';

const tokensCollection = require('../collections/tokens.js');
const randomstring = require("randomstring");

/**
 * lifetime of tokens in the system.
 * 7 days by default
 *
 * @var {number}
 */
const TOKEN_LIFETIME_IN_SECONDS = 7 * 24 * 60 * 60;

/**
 *
 * @param {string}   userId
 * @param {string}   userAgent
 * @param {Function} callback
 *
 * @returns {undefined}
 */
function generateToken(userId, userAgent, callback) {
  tokensCollection.insertDocument(
    {
      token: randomstring.generate(),
      expiresAt: Date.now() + TOKEN_LIFETIME_IN_SECONDS * 1000,
      userId: userId,
      userAgent: userAgent
    },
    result => {
      callback(result !== null
        ? result.ops[0]
        : null
      )
    }
  );
}

/**
 *
 * @param {string} tokenDescriptor
 *
 * @returns {boolean}
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
   * @returns {undefined}
   */
  createToken: (userId, userAgent, callback) => {
    tokensCollection.getDocumentByUserData(userId, userAgent, tokenDescriptor => {
      if(tokenDescriptor !== null) {
        module.exports.deleteToken(tokenDescriptor.token, () => {
          generateToken(userId, userAgent, callback);
        });
      }
      else {
        generateToken(userId, userAgent, callback);
      }
    });
  },
  /**
   *
   * @param {string} token
   * @param {Function} callback
   *
   * @returns {undefined}
   */
  deleteToken: (token, callback) => {
    tokensCollection.deleteDocumentByToken(token, isDeleted => {
        callback(isDeleted);
    });
  },
  /**
   *
   * @param {string}   token
   * @param {Function} callback
   *
   * @returns {undefined}
   */
  getTokenDescriptor: (token, callback) => {
    tokensCollection.getDocumentByToken(token, (tokenDescriptor) => {
      if(isExpiredToken(tokenDescriptor)) {
        deleteToken(tokenDescriptor.token, () => {
            callback(null);
        });
      }
      else {
        callback(tokenDescriptor)
      }
    });
  }
};