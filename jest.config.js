module.exports = {
  setupFiles: ['<rootDir>/enzyme.config.js'],
  transform: {
    // Make sure we're transpiling JS/JSX
    '^.+\\.(js|jsx)$': 'babel-jest',
    // Mock static assets:
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|svg|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileTransformer.js',
    // Lastly cover CSS module errors
    '^.+\\.css$': '<rootDir>/node_modules/jest-css-modules',
  },
};
