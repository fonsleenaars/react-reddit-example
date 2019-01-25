import PropTypes from 'prop-types';
import React from 'react';

import Post from './Post';
import styles from './Posts.css';


export default class Posts extends React.Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  render() {
    const {
      posts,
    } = this.props;

    return (
      <ul className={styles.list}>
        {posts.map(post => (
          <Post key={post.data.id} post={post.data} />
        ))}
      </ul>
    );
  }
}
