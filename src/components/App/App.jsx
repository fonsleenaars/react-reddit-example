import React from 'react';

import Reddit from '../Reddit';
import styles from './App.css';


export default class App extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          Reddit/React example
        </div>
        <Reddit />
      </div>
    );
  }
}
