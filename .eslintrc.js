module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: [
    'babel',
    'react',
  ],
  env: {
    browser: true,
  },
  overrides: [
    {
      files: ['*.spec.js'],
      rules: {
        'no-undef': 0,
        'react/jsx-filename-extension': 0,
      },
    },
  ],
  rules: {
    // Disable the dependency check because we're using Webpack, all dependencies are dev
    'import/no-extraneous-dependencies': 0,
    // Classes are automatically transformed into functions with a babel plugin
    'react/prefer-stateless-function': 0,
    // Sort-comp is way too opinionated about the order with class properties
    'react/sort-comp': 0,
  },
};
