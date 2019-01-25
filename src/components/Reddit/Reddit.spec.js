import React from 'react';
import { shallow } from 'enzyme';

import Reddit from '.';


describe('Reddit', () => {
  it('fetch data from reddit and display the posts', (done) => {
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
        posts: [],
      });

      global.fetch.mockClear();
      done();
    });
  });
});
