module.exports = {
  'env': {
    'es6': true,
    'browser': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'google',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true,
    },
    'sourceType': 'module',
  },
  'rules': {
      'indent': [2,2,]
  },
  'plugins': [
    'react',
  ],
};