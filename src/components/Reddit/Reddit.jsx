import 'whatwg-fetch';
import React from 'react';

import Loader from '../Loader';


export default class Reddit extends React.Component {
  state = {
    loading: true,
    posts: [],
  };

  componentDidMount() {
    window.fetch('https://www.reddit.com/r/pics.json')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          loading: false,
          posts: json.data.children,
        });
      }).catch((error) => {
        this.setState({
          loading: false,
          error,
        });
      });
  }

  render() {
    const {
      error,
      loading,
      posts,
    } = this.state;

    if (loading) {
      return (
        <Loader />
      );
    }

    return (
      error || (
        <div>
          There are
          {` ${posts.length} `}
          posts from reddit.
        </div>
      )
    );
  }
}
