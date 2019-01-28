import 'whatwg-fetch';
import React from 'react';

import Loader from '../Loader';
import Posts from '../Posts';
import styles from './Reddit.css';


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
    this.setState({
      loading: true,
    });

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

  checkSubmit = (e) => {
    if (e.key === 'Enter') {
      const {
        subreddit,
      } = this.state;

      this.fetchSubreddit(subreddit);
    }
  }

  setSubreddit = (e) => {
    this.setState({
      // Make sure to strip all non alphanumeric chars:
      subreddit: e.target.value.replace(/\W/g, ''),
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
          <input
            className={styles.subredditInput}
            type="text"
            value={subreddit}
            onChange={this.setSubreddit}
            onKeyPress={this.checkSubmit}
          />
        </h3>
        <Posts posts={posts} />
      </div>
    );
  }
}
