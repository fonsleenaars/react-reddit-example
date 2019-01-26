import PropTypes from 'prop-types';
import React from 'react';

import Post from './Post';
import styles from './Posts.css';


export default class Posts extends React.Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  state = (() => {
    const {
      posts,
    } = this.props;

    // Initialize from props, will be changed later
    return {
      posts,
    };
  })();

  hide = (id) => {
    this.setState(prevState => ({
      posts: prevState.posts.filter(post => post.data.id !== id),
    }));
  }

  render() {
    const {
      posts,
    } = this.state;

    return (
      <ul className={styles.list}>
        {posts.map(post => (
          <Post
            key={post.data.id}
            hide={this.hide}
            post={post.data}
          />
        ))}
      </ul>
    );
  }
}
