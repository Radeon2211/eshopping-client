import React from 'react';
import { mount } from 'enzyme';
import { Router, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import InputPagination from './InputPagination';
import { checkProps, historyPageNum, propsPagination } from '../../../shared/testUtility';

const setUp = (props = {}, history) => {
  return mount(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <InputPagination {...props} />
      </ThemeProvider>
    </Router>,
  );
};

const defaultProps = propsPagination();

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
      const history = historyPageNum(1);
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
      const history = historyPageNum(3);
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
      const history = historyPageNum(2);
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
      const history = historyPageNum(1);
      const props = propsPagination(2);
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
