import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import PaginationCounter, { SC } from './PaginationCounter';
import { checkProps } from '../../../shared/utility';
import { listItemTypes } from '../../../shared/constants';

const setUp = (props = {}, history) => {
  return mount(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <PaginationCounter {...props} />
      </ThemeProvider>
    </Router>,
  );
};

const createProps = (itemQuantity, maxQuantityPerPage) => ({
  itemQuantity,
  itemsType: listItemTypes.PRODUCT,
  maxQuantityPerPage,
});

const createHistory = (pageNumber) => ({
  listen: jest.fn(),
  location: { search: `?p=${pageNumber}` },
});

describe('<PaginationCounter />', () => {
  describe('Check prop types', () => {
    const props = createProps(5, 2);
    it('Should NOT throw a warning', () => {
      expect(checkProps(PaginationCounter, props)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(PaginationCounter, {})).not.toBe(null);
    });
  });

  describe('Check if correct text render', () => {
    it('Should should be 1 - 2, 5', () => {
      const props = createProps(5, 2);
      const history = createHistory(1);
      const wrapper = setUp(props, history);
      expect(wrapper.find(SC.Wrapper).text()).toBe('1 - 2 of 5 products');
    });
    it('Should should be 3 - 4, 5', () => {
      const props = createProps(5, 2);
      const history = createHistory(2);
      const wrapper = setUp(props, history);
      expect(wrapper.find(SC.Wrapper).text()).toBe('3 - 4 of 5 products');
    });
    it('Should should be 5 - 7, 7', () => {
      const props = createProps(7, 4);
      const history = createHistory(2);
      const wrapper = setUp(props, history);
      expect(wrapper.find(SC.Wrapper).text()).toBe('5 - 7 of 7 products');
    });
    it('Should should be 1 - 1, 10', () => {
      const props = createProps(10, 1);
      const history = createHistory(1);
      const wrapper = setUp(props, history);
      expect(wrapper.find(SC.Wrapper).text()).toBe('1 - 1 of 10 products');
    });
    it('Should should be 1 - 1, 10', () => {
      const props = createProps(10, 1);
      const history = createHistory(10);
      const wrapper = setUp(props, history);
      expect(wrapper.find(SC.Wrapper).text()).toBe('10 - 10 of 10 products');
    });
  });
});
