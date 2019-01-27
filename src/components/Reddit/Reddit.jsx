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

  constructor(props) {
    super(props);

    this.fetchSubreddit = this.fetchSubreddit.bind(this);
  }

  componentDidMount() {
    const {
      subreddit,
    } = this.state;

    this.fetchSubreddit(subreddit);
  }

  // This would normally be an arrow function/class property but Jest
  // can't mock them at the moment. Regular class method it is.
  fetchSubreddit(subreddit) {
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

  setSubreddit = (subreddit) => {
    this.setState({
      subreddit,
    });

    this.fetchSubreddit(subreddit);
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
