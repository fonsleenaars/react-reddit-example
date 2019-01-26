import React from 'react';
import { shallow } from 'enzyme';

import Reddit from '.';


describe('Reddit', () => {
  it('fetch data from reddit, default is /r/pics', (done) => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const wrapper = shallow(<Reddit />);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.reddit.com/r/pics.json');

    process.nextTick(() => {
      expect(wrapper.state()).toEqual({
        loading: false,
        posts: [],
        subreddit: 'pics',
      });

      global.fetch.mockClear();
      done();
    });
  });

  it('fetch data from anothers subreddit', (done) => {
    const mockSuccessResponse = {
      data: {
        children: [{
          title: 'A very important post',
          thumbnail: 'link-to-an-actual-image.image-extension',
          thumbnail_height: 123,
          thumbnail_width: 345,
        }],
      },
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const wrapper = shallow(<Reddit />);
    global.fetch.mockClear();
    wrapper.instance().setSubreddit('news');

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.reddit.com/r/news.json');

    process.nextTick(() => {
      expect(wrapper.state()).toEqual({
        loading: false,
        posts: [{
          title: 'A very important post',
          thumbnail: 'link-to-an-actual-image.image-extension',
          thumbnail_height: 123,
          thumbnail_width: 345,
        }],
        subreddit: 'news',
      });

      global.fetch.mockClear();
      done();
    });
  });
});
