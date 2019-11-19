const schema = require('./schema.json');
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'graphql'
  ],
  rules: {
    'react/react-in-jsx-scope' : 'off',
    'react/jsx-filename-extension' : 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    'graphql/template-strings' : ['error', {
      env: 'apollo',
      tagName: 'gql',
      schemaJson: schema
    }],
    'react/prop-types': [2, { ignore: ['children'] }],
  },
};
