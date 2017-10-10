module.exports = {
  'env': {
    'es6': true,
    'node': true,
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
    'indent': [2, 2],
    'react/jsx-uses-vars': 2,
    'react/jsx-uses-react': 2,
    'require-jsdoc': 'off',
  },
  'plugins': [
    'react',
  ],
};
