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

describe('<PaginationCounter />', () => {
  describe('Check prop types', () => {
    const expectedProps = {
      itemQuantity: 5,
      itemsType: listItemTypes.PRODUCT,
      maxQuantityPerPage: 2,
    };
    it('Should NOT throw a warning', () => {
      expect(checkProps(PaginationCounter, expectedProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(PaginationCounter, {})).not.toBe(null);
    });
  });

  describe('Check if correct text render', () => {
    it('Should should be 1 - 2, 5', () => {
      const props = {
        itemQuantity: 5,
        itemsType: listItemTypes.PRODUCT,
        maxQuantityPerPage: 2,
      };
      const history = {
        listen: jest.fn(),
        location: { search: '?p=1' },
      };
      const wrapper = setUp(props, history);
      expect(wrapper.find(SC.Wrapper).text()).toBe('1 - 2 of 5 products');
    });
    it('Should should be 3 - 4, 5', () => {
      const props = {
        itemQuantity: 5,
        itemsType: listItemTypes.PRODUCT,
        maxQuantityPerPage: 2,
      };
      const history = {
        listen: jest.fn(),
        location: { search: '?p=2' },
      };
      const wrapper = setUp(props, history);
      expect(wrapper.find(SC.Wrapper).text()).toBe('3 - 4 of 5 products');
    });
    it('Should should be 5 - 7, 7', () => {
      const props = {
        itemQuantity: 7,
        itemsType: listItemTypes.PRODUCT,
        maxQuantityPerPage: 4,
      };
      const history = {
        listen: jest.fn(),
        location: { search: '?p=2' },
      };
      const wrapper = setUp(props, history);
      expect(wrapper.find(SC.Wrapper).text()).toBe('5 - 7 of 7 products');
    });
    it('Should should be 1 - 1, 10', () => {
      const props = {
        itemQuantity: 10,
        itemsType: listItemTypes.PRODUCT,
        maxQuantityPerPage: 1,
      };
      const history = {
        listen: jest.fn(),
        location: { search: '?p=1' },
      };
      const wrapper = setUp(props, history);
      expect(wrapper.find(SC.Wrapper).text()).toBe('1 - 1 of 10 products');
    });
    it('Should should be 1 - 1, 10', () => {
      const props = {
        itemQuantity: 10,
        itemsType: listItemTypes.PRODUCT,
        maxQuantityPerPage: 1,
      };
      const history = {
        listen: jest.fn(),
        location: { search: '?p=10' },
      };
      const wrapper = setUp(props, history);
      expect(wrapper.find(SC.Wrapper).text()).toBe('10 - 10 of 10 products');
    });
  });
});
