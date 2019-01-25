# react-reddit-example
This simple example of a Reddit implementation with ReactJS loads the data from [https://www.reddit.com/r/pics.json](https://www.reddit.com/r/pics.json) and shows them as a list of articles. Articles can be hidden.

## Project setup
This project uses a Webpack 4 setup with Babel to transpile the ES6 components into ES5 and then run them on the webpack-dev-server during development, and compile them into a production package on build that could be deployed on any simple webserver.

A consistent component setup is used to allow for an easy and structured overview:
```
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
const ComponentA from './src/components/ComponentA';
```

## Code styling
This project uses ESLint to ensure code style consistency and is based off the [airbnb-config](https://github.com/airbnb/javascript/tree/master/react).

## Run the project
To run the project (assuming Node is installed), run:
```
npm ci
npm start
```

## Testing
To run the unit tests, run:
```
npm test
```

Component tests are included in the component folder following the `Component.spec.js` standard.
