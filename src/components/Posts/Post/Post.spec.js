import React from 'react';
import { shallow } from 'enzyme';

import redditData from '../../../../__mocks__/redditData';
import Post from '.';


describe('Post component', () => {
  it('Show a post with a thumbnail', () => {
    const wrapper = shallow(<Post post={redditData[0].data} />);

    expect(wrapper.find('img').prop('src')).toBe('calvin-hobbes-bees-nest.jpg');
    expect(wrapper.find('span').text()).toBe('Calvin & Hobbes strike again');
  });

  it('Show a post without a thumbnail', () => {
    const wrapper = shallow(<Post post={redditData[2].data} />);

    // Verify that the image is our placeholder (link.png in /src/images)
    expect(wrapper.find('img').prop('src')).toBe('link.png');
    expect(wrapper.find('span').text()).toBe('This post has a missing thumbnail');
  });
});
