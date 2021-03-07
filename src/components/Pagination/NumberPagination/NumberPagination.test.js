import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import NumberPagination from './NumberPagination';
import {
  checkProps,
  createHistoryPageNumber,
  createPaginationProps,
} from '../../../shared/testUtility';

const setUp = (props = {}, history) => {
  return render(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <NumberPagination {...props} />
      </ThemeProvider>
    </Router>,
  );
};

const defaultProps = createPaginationProps();

afterEach(cleanup);

describe('<NumberPagination />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(NumberPagination, defaultProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(NumberPagination, {})).not.toBe(null);
    });
  });

  describe('Check how renders', () => {
    it('Should render all correctly (without hide-arrow class on arrows)', () => {
      const history = createHistoryPageNumber(2);
      const { asFragment } = setUp(defaultProps, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render six number links if p is 1 and page 1 has active class, quantity is 20, per page is 2', () => {
      const props = createPaginationProps(20);
      const history = createHistoryPageNumber(1);
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render ellipsis and six number links and page 10 has active class if p is 10, quantity is 20, per page is 2', () => {
      const props = createPaginationProps(20);
      const history = createHistoryPageNumber(10);
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render ellipsis and six number links and page 8 has active class if p is 8, quantity is 20, per page is 2', () => {
      const props = createPaginationProps(20);
      const history = createHistoryPageNumber(8);
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should only left arrow has hide-arrow class', () => {
      const history = createHistoryPageNumber(1);
      setUp(defaultProps, history);
      expect(
        screen.getByTestId('NumberPagination-left-arrow').className.includes('hide-arrow'),
      ).toEqual(true);
      expect(
        screen.getByTestId('NumberPagination-right-arrow').className.includes('hide-arrow'),
      ).toEqual(false);
    });

    it('Should only right arrow has hide-arrow class', () => {
      const history = createHistoryPageNumber(3);
      setUp(defaultProps, history);
      expect(
        screen.getByTestId('NumberPagination-left-arrow').className.includes('hide-arrow'),
      ).toEqual(false);
      expect(
        screen.getByTestId('NumberPagination-right-arrow').className.includes('hide-arrow'),
      ).toEqual(true);
    });

    it('Should both arrows have hide-arrow class', () => {
      const history = createHistoryPageNumber(1);
      const props = createPaginationProps(2);
      setUp(props, history);
      expect(
        screen.getByTestId('NumberPagination-left-arrow').className.includes('hide-arrow'),
      ).toEqual(true);
      expect(
        screen.getByTestId('NumberPagination-right-arrow').className.includes('hide-arrow'),
      ).toEqual(true);
    });
  });

  describe('Check behaviour of links', () => {
    it('Right arrow click (p is 1, quantity is 5, per page is 2)', () => {
      const pushFn = jest.fn();
      const history = createHistoryPageNumber(1, pushFn);

      const { getByTestId } = setUp(defaultProps, history);

      fireEvent.click(getByTestId('NumberPagination-right-arrow'));
      expect(pushFn).toHaveBeenCalledTimes(1);
      expect(pushFn).toHaveBeenCalledWith('/products?p=2');
    });

    it('Left arrow click (p is 3, quantity is 5, per page is 2)', () => {
      const pushFn = jest.fn();
      const history = createHistoryPageNumber(3, pushFn);

      const { getByTestId } = setUp(defaultProps, history);

      fireEvent.click(getByTestId('NumberPagination-left-arrow'));
      expect(pushFn).toHaveBeenCalledTimes(1);
      expect(pushFn).toHaveBeenCalledWith('/products?p=2');
    });

    it('Both arrows clicks (p is 2, quantity is 5, per page is 2)', () => {
      const pushFn = jest.fn();
      const history = createHistoryPageNumber(2, pushFn);

      const { getByTestId } = setUp(defaultProps, history);

      fireEvent.click(getByTestId('NumberPagination-left-arrow'));
      expect(pushFn).toHaveBeenCalledWith('/products?p=1');
      fireEvent.click(getByTestId('NumberPagination-right-arrow'));
      expect(pushFn).toHaveBeenLastCalledWith('/products?p=3');
      expect(pushFn).toHaveBeenCalledTimes(2);
    });

    it('Number clicks (p is 8, quantity is 20, per page is 2)', () => {
      const pushFn = jest.fn();
      const props = createPaginationProps(20);
      const history = createHistoryPageNumber(8, pushFn);

      const { getByTestId } = setUp(props, history);

      fireEvent.click(getByTestId('NumberPagination-page1'));
      expect(pushFn).toHaveBeenCalledWith('/products?p=1');
      fireEvent.click(getByTestId('NumberPagination-page6'));
      expect(pushFn).toHaveBeenLastCalledWith('/products?p=6');
      fireEvent.click(getByTestId('NumberPagination-page7'));
      expect(pushFn).toHaveBeenLastCalledWith('/products?p=7');
      fireEvent.click(getByTestId('NumberPagination-page8'));
      expect(pushFn).toHaveBeenLastCalledWith('/products?p=8');
      fireEvent.click(getByTestId('NumberPagination-page9'));
      expect(pushFn).toHaveBeenLastCalledWith('/products?p=9');
      fireEvent.click(getByTestId('NumberPagination-page10'));
      expect(pushFn).toHaveBeenLastCalledWith('/products?p=10');
      expect(pushFn).toHaveBeenCalledTimes(6);
    });
  });
});
