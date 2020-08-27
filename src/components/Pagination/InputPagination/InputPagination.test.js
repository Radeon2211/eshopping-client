import React from 'react';
import { mount } from 'enzyme';
import { Router, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import InputPagination from './InputPagination';
import { checkProps } from '../../../shared/utility';

const setUp = (props = {}, history) => {
  return mount(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <InputPagination {...props} />
      </ThemeProvider>
    </Router>,
  );
};

const createProps = (itemQuantity = 5) => ({
  itemQuantity,
  isDataLoading: false,
  maxQuantityPerPage: 2,
});

const defaultProps = createProps();

const createHistory = (pageNumber) => ({
  listen: jest.fn(),
  location: { search: `?p=${pageNumber}` },
  createHref: jest.fn(),
  push: jest.fn(),
});

describe('<NumberPagination />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(InputPagination, defaultProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(InputPagination, {})).not.toBe(null);
    });
  });

  describe('Check if arrows render correctly', () => {
    it('Should render only right arrow', () => {
      const history = createHistory(1);
      const wrapper = setUp(defaultProps, history);
      expect(
        wrapper.find(Link).filterWhere((item) => {
          return item.prop('data-test') === 'leftArrow';
        }),
      ).toHaveLength(0);
      expect(
        wrapper.find(Link).filterWhere((item) => {
          return item.prop('data-test') === 'rightArrow';
        }),
      ).toHaveLength(1);
    });
    it('Should render only left arrow', () => {
      const history = createHistory(3);
      const wrapper = setUp(defaultProps, history);
      expect(
        wrapper.find(Link).filterWhere((item) => {
          return item.prop('data-test') === 'leftArrow';
        }),
      ).toHaveLength(1);
      expect(
        wrapper.find(Link).filterWhere((item) => {
          return item.prop('data-test') === 'rightArrow';
        }),
      ).toHaveLength(0);
    });
    it('Should render both arrows', () => {
      const history = createHistory(2);
      const wrapper = setUp(defaultProps, history);
      expect(
        wrapper.find(Link).filterWhere((item) => {
          return item.prop('data-test') === 'leftArrow';
        }),
      ).toHaveLength(1);
      expect(
        wrapper.find(Link).filterWhere((item) => {
          return item.prop('data-test') === 'rightArrow';
        }),
      ).toHaveLength(1);
    });
    it('Should NOT render both arrows', () => {
      const history = createHistory(1);
      const props = createProps(2);
      const wrapper = setUp(props, history);
      expect(
        wrapper.find(Link).filterWhere((item) => {
          return item.prop('data-test') === 'leftArrow';
        }),
      ).toHaveLength(0);
      expect(
        wrapper.find(Link).filterWhere((item) => {
          return item.prop('data-test') === 'rightArrow';
        }),
      ).toHaveLength(0);
    });
  });
});
