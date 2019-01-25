import PropTypes from 'prop-types';
import React from 'react';

import ThumbailFallback from '../../../images/link.png';
import styles from './Post.css';


export default class Post extends React.Component {
  static propTypes = {
    post: PropTypes.shape({
      thumbnail: PropTypes.string,
      thumbnail_height: PropTypes.number,
      title: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const {
      post: {
        thumbnail,
        thumbnail_height: thumbnailHeight,
        title,
      },
    } = this.props;

    const thumbnailSrc = thumbnailHeight ? thumbnail : ThumbailFallback;

    return (
      <li className={styles.item}>
        <img
          alt={`Thumbnail ${title}`}
          className={styles.thumbnail}
          src={thumbnailSrc}
        />
        <span className={styles.title}>
          {title}
        </span>
      </li>
    );
  }
}
