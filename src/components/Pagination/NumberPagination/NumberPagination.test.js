import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import NumberPagination from './NumberPagination';
import {
  checkProps,
  createHistoryPageNumber,
  createPaginationProps,
} from '../../../shared/testUtility/testUtility';

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
  describe('check prop types', () => {
    it('should NOT throw a warning', () => {
      expect(checkProps(NumberPagination, defaultProps)).toBeUndefined();
    });
    it('should throw a warning', () => {
      expect(checkProps(NumberPagination, {})).not.toBe(null);
    });
  });

  describe('check how renders', () => {
    it('should render all correctly (without hide-arrow class on arrows)', () => {
      const history = createHistoryPageNumber(2);
      const { asFragment } = setUp(defaultProps, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render six number links if p is 1 and page 1 has active class, quantity is 20, per page is 2', () => {
      const props = createPaginationProps(20);
      const history = createHistoryPageNumber(1);
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render ellipsis and six number links and page 10 has active class if p is 10, quantity is 20, per page is 2', () => {
      const props = createPaginationProps(20);
      const history = createHistoryPageNumber(10);
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render ellipsis and six number links and page 8 has active class if p is 8, quantity is 20, per page is 2', () => {
      const props = createPaginationProps(20);
      const history = createHistoryPageNumber(8);
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should only left arrow has hide-arrow class', () => {
      const history = createHistoryPageNumber(1);
      setUp(defaultProps, history);
      expect(screen.getByTestId('NumberPagination-left-arrow')).toHaveClass('hide-arrow');
      expect(screen.getByTestId('NumberPagination-right-arrow')).not.toHaveClass('hide-arrow');
    });

    it('should only right arrow has hide-arrow class', () => {
      const history = createHistoryPageNumber(3);
      setUp(defaultProps, history);
      expect(screen.getByTestId('NumberPagination-left-arrow')).not.toHaveClass('hide-arrow');
      expect(screen.getByTestId('NumberPagination-right-arrow')).toHaveClass('hide-arrow');
    });

    it('should both arrows have hide-arrow class', () => {
      const history = createHistoryPageNumber(1);
      const props = createPaginationProps(2);
      setUp(props, history);
      expect(screen.getByTestId('NumberPagination-left-arrow')).toHaveClass('hide-arrow');
      expect(screen.getByTestId('NumberPagination-right-arrow')).toHaveClass('hide-arrow');
    });
  });

  describe('check behaviour of links', () => {
    it('should react to right arrow click (p is 1, quantity is 5, per page is 2)', () => {
      const history = createHistoryPageNumber(1);
      setUp(defaultProps, history);

      fireEvent.click(screen.getByTestId('NumberPagination-right-arrow'));
      expect(history.push).toHaveBeenCalledWith('/products?p=2');
    });

    it('should react to left arrow click (p is 3, quantity is 5, per page is 2)', () => {
      const history = createHistoryPageNumber(3);
      setUp(defaultProps, history);

      fireEvent.click(screen.getByTestId('NumberPagination-left-arrow'));
      expect(history.push).toHaveBeenCalledWith('/products?p=2');
    });

    it('should react to oth arrows clicks (p is 2, quantity is 5, per page is 2)', () => {
      const history = createHistoryPageNumber(2);
      setUp(defaultProps, history);

      fireEvent.click(screen.getByTestId('NumberPagination-left-arrow'));
      expect(history.push).toHaveBeenCalledWith('/products?p=1');

      fireEvent.click(screen.getByTestId('NumberPagination-right-arrow'));
      expect(history.push).toHaveBeenLastCalledWith('/products?p=3');

      expect(history.push).toHaveBeenCalledTimes(2);
    });

    it('should react to numbers clicks (p is 8, quantity is 20, per page is 2)', () => {
      const props = createPaginationProps(20);
      const history = createHistoryPageNumber(8);

      setUp(props, history);

      fireEvent.click(screen.getByTestId('NumberPagination-page1'));
      expect(history.push).toHaveBeenCalledWith('/products?p=1');

      fireEvent.click(screen.getByTestId('NumberPagination-page6'));
      expect(history.push).toHaveBeenLastCalledWith('/products?p=6');

      fireEvent.click(screen.getByTestId('NumberPagination-page7'));
      expect(history.push).toHaveBeenLastCalledWith('/products?p=7');

      fireEvent.click(screen.getByTestId('NumberPagination-page8'));
      expect(history.push).toHaveBeenLastCalledWith('/products?p=8');

      fireEvent.click(screen.getByTestId('NumberPagination-page9'));
      expect(history.push).toHaveBeenLastCalledWith('/products?p=9');

      fireEvent.click(screen.getByTestId('NumberPagination-page10'));
      expect(history.push).toHaveBeenLastCalledWith('/products?p=10');

      expect(history.push).toHaveBeenCalledTimes(6);
    });
  });
});
