import React from 'react';
import { mount } from 'enzyme';
import { Router, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import NumberPagination from './NumberPagination';
import { checkProps } from '../../../shared/utility';

const setUp = (props = {}, history) => {
  return mount(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <NumberPagination {...props} />
      </ThemeProvider>
    </Router>,
  );
};

const createProps = (itemQuantity = 5) => ({
  itemQuantity,
  isListLoading: false,
  maxQuantityPerPage: 2,
});

const defaultProps = createProps();

const createHistory = (pageNumber) => ({
  listen: jest.fn(),
  location: { search: `?p=${pageNumber}` },
  createHref: jest.fn(),
});

describe('<NumberPagination />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(NumberPagination, defaultProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(NumberPagination, {})).not.toBe(null);
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

  describe('Check if number links render correctly', () => {
    it('Should render three number links', () => {
      const history = createHistory(1);
      const wrapper = setUp(defaultProps, history);
      expect(
        wrapper.find(Link).filterWhere((item) => {
          return item.hasClass('number-link');
        }),
      ).toHaveLength(3);
    });
    it('Should render six number links if p === 1 & quantity === 20', () => {
      const props = createProps(20);
      const history = createHistory(1);
      const wrapper = setUp(props, history);
      expect(
        wrapper.find(Link).filterWhere((item) => {
          return item.hasClass('number-link');
        }),
      ).toHaveLength(6);
    });
    it('Should render ellipsis and six number links if p === 8 & quantity === 20', () => {
      const props = createProps(20);
      const history = createHistory(8);
      const wrapper = setUp(props, history);
      expect(wrapper.find('.ellipsis')).toHaveLength(1);
      expect(
        wrapper.find(Link).filterWhere((item) => {
          return item.hasClass('number-link');
        }),
      ).toHaveLength(6);
    });
    it('Should render ellipsis and six number links if p === 10 & quantity === 20', () => {
      const props = createProps(20);
      const history = createHistory(10);
      const wrapper = setUp(props, history);
      expect(wrapper.find('.ellipsis')).toHaveLength(1);
      expect(
        wrapper.find(Link).filterWhere((item) => {
          return item.hasClass('number-link');
        }),
      ).toHaveLength(6);
    });
  });
});
