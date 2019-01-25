import 'whatwg-fetch';
import React from 'react';


export default class Reddit extends React.Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    window.fetch('https://www.reddit.com/r/pics.json')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          posts: json.data.children,
        });
      });
  }

  render() {
    const {
      posts,
    } = this.state;

    return (
      <div>
        There are
        {` ${posts.length} `}
        posts from reddit.
      </div>
    );
  }
}
