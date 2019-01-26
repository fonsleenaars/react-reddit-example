import PropTypes from 'prop-types';
import React from 'react';

import ThumbailFallback from '../../../images/link.png';
import styles from './Post.css';


export default class Post extends React.Component {
  static propTypes = {
    hide: PropTypes.func.isRequired,
    post: PropTypes.shape({
      thumbnail: PropTypes.string,
      thumbnail_height: PropTypes.number,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  hide = () => {
    const {
      hide,
      post,
    } = this.props;

    // Use the hide callback passed through props to inform the parent:
    hide(post.id);
  }

  render() {
    const {
      post: {
        id,
        thumbnail,
        thumbnail_height: thumbnailHeight,
        title,
        url,
      },
    } = this.props;

    const thumbnailSrc = thumbnailHeight ? thumbnail : ThumbailFallback;

    return (
      <li className={styles.item}>
        <a className={styles.url} href={url}>
          <img
            alt={`Thumbnail ${id}`}
            className={styles.thumbnail}
            src={thumbnailSrc}
          />
        </a>
        <div className={styles.postDetails}>
          <span className={styles.title}>
            {title}
          </span>
          <button
            className={styles.hide}
            onClick={this.hide}
            type="button"
          >
            Hide
          </button>
        </div>
      </li>
    );
  }
}
