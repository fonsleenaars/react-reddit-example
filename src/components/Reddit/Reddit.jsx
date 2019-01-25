import 'whatwg-fetch';
import React from 'react';

import Loader from '../Loader';
import Posts from '../Posts';


export default class Reddit extends React.Component {
  state = {
    loading: true,
    posts: [],
    subreddit: 'pics',
  };

  componentDidMount() {
    const {
      subreddit,
    } = this.state;

    window.fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          loading: false,
          posts: json.data.children,
        });
      }).catch(() => {
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    const {
      loading,
      posts,
      subreddit,
    } = this.state;

    if (loading) {
      return (
        <Loader />
      );
    }

    return (
      <div>
        <h3>
          Showing posts from /r/
          {subreddit}
        </h3>
        <Posts posts={posts} />
      </div>
    );
  }
}
