'use strict';
const tokensCollection = require('../collections/tokens.js');
const TOKEN_LIFETIME_IN_MS = 7 * 24 * 60 * 60;

/**
 *
 * @param {string} userId
 * @param {string} userAgent
 *
 * @returns {TokenDescriptor}
 */
function generateToken(userId, userAgent) {
  let tokenDescriptor = {
      token: '',
      expiresAt: Date.now() + TOKEN_LIFETIME_IN_SECONDS * 1000,
      userId: userId,
      userAgent: userAgent
  };

  tokensCollection.insertDocument(tokenDescriptor)

  return tokenDescriptor;
}

/**
 *
 * @param {string} tokenDescriptor
 *
 * @returns {Boolean}
 */
function isTokenValid(tokenDescriptor) {
    return tokenDescriptor !== null && tokenDescriptor.expiresAt <= Date.now();
}

module.exports = {
  /**
   *
   * @param {string} userId
   * @param {string} userAgent
   *
   * @returns {TokenDescriptor}
   */
  createToken: (userId, userAgent) => {
    let tokenDescriptor = tokensCollection.getDocumentByUserData(userId, userAgent);

    if(tokenDescriptor !== null) {
      deleteToken(tokenDescriptor.token);
    }

    return generateToken(userId, userAgent);
  },
  /**
   *
   * @param {string} token
   *
   * @returns {undefined}
   */
  deleteToken: token => {
    tokensCollection.deleteDocumentByToken(token);
  },
  /**
   *
   * @param {string} token
   *
   * @returns {null|TokenDescriptor}
   */
  getToken: token => {
    let tokenDescriptor = tokensCollection.getDocumentByToken(token);

    if(!isTokenValid(tokenDescriptor)) {
      deleteToken(tokenDescriptor.token);
      tokenDescriptor = null;
    }

    return tokenDescriptor;
  }
};