# react-reddit-example
[![Build Status](https://travis-ci.org/fonsleenaars/react-reddit-example.svg?branch=master)](https://travis-ci.org/fonsleenaars/react-reddit-example) [![Coverage Status](https://coveralls.io/repos/github/fonsleenaars/react-reddit-example/badge.svg?branch=master)](https://coveralls.io/github/fonsleenaars/react-reddit-example?branch=master)

This simple example of a Reddit implementation with ReactJS loads the data from [https://www.reddit.com](https://www.reddit.com) and shows it as a list of articles. Articles can be hidden. Check out a live preview here [https://fonsleenaars.github.io/react-reddit-example/](https://fonsleenaars.github.io/react-reddit-example/)

## Project setup
This project uses a Webpack 4 setup with Babel to transpile the ES6 components into ES5 and then run them on the webpack-dev-server during development, and compile them into a production package on build that could be deployed on any simple webserver.

A consistent component setup is used to allow for an easy and structured overview:
```js
./src/components/ComponentA                   // The component folder, always capitalized
./src/components/ComponentA/index.jsx         // The container file
./src/components/ComponentA/ComponentA.jsx    // The component file
./src/components/ComponentA/ComponentA.css    // The CSS file (css modules are enabled)
```

Assuming a simple presentational component, the container file would simply hold:
```js
export { default } from './ComponentA';
```

Importing a component would then look like:
```js
import ComponentA from './src/components/ComponentA';
```

## Code styling
This project uses ESLint to ensure code style consistency and is based off the [airbnb-config](https://github.com/airbnb/javascript/tree/master/react).

## Run the project
To run the project (assuming Node is installed), run:
```
npm ci
npm start
```

The project is available at [localhost:8000/react-reddit-example](http://localhost:8000/react-reddit-example)

## Testing
To run the unit tests, run:
```
npm test
```

Component tests are included in the component folder following the `Component.spec.js` standard.
