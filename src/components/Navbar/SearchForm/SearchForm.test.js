import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import SearchForm from './SearchForm';
import * as SC from './SearchForm.sc';
import theme from '../../../styled/theme';

const setUp = (push = jest.fn(), search = 'p=1') => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products?', search },
    push,
  };
  return mount(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <SearchForm />
      </ThemeProvider>
    </Router>,
  );
};

describe('<SearchForm />', () => {
  describe(`Check if correct url is pushing to history`, () => {
    it('Should push /products?p=1&name=test-name if there is no name in url', () => {
      const pushFn = jest.fn();
      const wrapper = setUp(pushFn);
      const form = wrapper.find(SC.SearchForm);
      const nameInput = wrapper.find('.name-input');
      nameInput.simulate('change', { target: { value: 'test-name' } });
      form.simulate('submit');
      expect(pushFn).toBeCalledWith('/products?p=1&name=test-name');
    });

    it('Should push /products?p=1 if in url is name', () => {
      const pushFn = jest.fn();
      const wrapper = setUp(pushFn, 'p=1&name=test-name');
      const form = wrapper.find(SC.SearchForm);
      const nameInput = wrapper.find('.name-input');
      nameInput.simulate('change', { target: { value: '' } });
      form.simulate('submit');
      expect(pushFn).toBeCalledWith('/products?p=1');
    });

    it('Should NOT call push if in url is no name and input is empty', () => {
      const pushFn = jest.fn();
      const wrapper = setUp(pushFn);
      const form = wrapper.find(SC.SearchForm);
      form.simulate('submit');
      expect(pushFn).not.toBeCalled();
    });

    it('Should NOT call push if in url is name and input is not edited', () => {
      const pushFn = jest.fn();
      const wrapper = setUp(pushFn, 'p=1&name=test-name');
      const form = wrapper.find(SC.SearchForm);
      form.simulate('submit');
      expect(pushFn).not.toBeCalled();
    });
  });
});