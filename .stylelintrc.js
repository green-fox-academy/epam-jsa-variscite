module.exports = {
  'extends': 'stylelint-config-sass-guidelines',
  'rules': {
    'selector-no-qualifying-type': [
      true,
      {'ignore': ['attribute', 'class']},
    ],
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
  },
};
