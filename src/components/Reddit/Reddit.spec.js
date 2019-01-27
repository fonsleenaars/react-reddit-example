import React from 'react';
import { shallow } from 'enzyme';

import redditData from '../../../__mocks__/redditData';
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
        children: redditData,
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
          data: {
            id: 'a1',
            title: 'Calvin & Hobbes strike again',
            thumbnail: 'calvin-hobbes-bees-nest.jpg',
            thumbnail_height: 120,
            thumbnail_width: 80,
            url: 'url-to-larger-picture-of-bees-nest.jpg',
          },
        }, {
          data: {
            id: 'a2',
            title: 'Elon Musk lands on Mars',
            thumbnail: 'how-did-he-manage-that.gif',
            thumbnail_height: 120,
            thumbnail_width: 80,
            url: 'url-to-spaceship-landing.gif',
          },
        }, {
          data: {
            id: 'a3',
            title: 'This post has a missing thumbnail',
            thumbnail: 'self',
            thumbnail_height: null,
            thumbnail_width: null,
            url: 'url-to-a-subreddit-post',
          },
        }],
        subreddit: 'news',
      });

      global.fetch.mockClear();
      done();
    });
  });
});
