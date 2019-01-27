import React from 'react';
import { shallow } from 'enzyme';

import redditData from '../../../__mocks__/redditData';
import Post from './Post';
import Posts from '.';


describe('Posts component', () => {
  it('Shows a list of three posts', () => {
    const wrapper = shallow(<Posts posts={redditData} />);

    // There should be three posts (see <Root>/__mocks__/redditData.js)
    expect(wrapper.find(Post)).toHaveLength(3);
  });

  it('Hide a post from a list of three', () => {
    const wrapper = shallow(<Posts posts={redditData} />);
    wrapper
      .find(Post)
      .first()
      .dive()
      .instance()
      .hide();

    expect(wrapper.find(Post)).toHaveLength(2);
  });
});
