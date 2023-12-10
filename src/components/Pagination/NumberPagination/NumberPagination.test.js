import React from 'react';
import { render, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import NumberPagination from './NumberPagination';
import {
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
  describe('check how renders', () => {
    it('should render links from 1 to 3 and second with active class without hide-arrow class on arrows if p is 2, quantity is 5, per page is 2', () => {
      const history = createHistoryPageNumber(2);
      setUp(defaultProps, history);
      expect(screen.getByTestId('NumberPagination-number-of-pages')).toHaveTextContent('3');
      expect(screen.getByTestId('NumberPagination-left-arrow')).not.toHaveClass('hide-arrow');
      expect(screen.getByTestId('NumberPagination-right-arrow')).not.toHaveClass('hide-arrow');
      expect(screen.getByTestId('NumberPagination-page2')).toHaveClass('active');
    });

    it('should render links from 1 to 6 and 10 pages and first with active class if p is 1, quantity is 20, per page is 2', () => {
      const props = createPaginationProps(20);
      const history = createHistoryPageNumber(1);
      setUp(props, history);
      expect(screen.getByTestId('NumberPagination-number-of-pages')).toHaveTextContent('10');
      expect(screen.getByTestId('NumberPagination-page1')).toHaveClass('active');
      expect(screen.getByTestId('NumberPagination-page6')).toBeInTheDocument();
    });

    it('should render ellipsis and 6 links: 1 and from 6 to 10 and tenth with active class and 10 pages if p is 10, quantity is 20, per page is 2', () => {
      const props = createPaginationProps(20);
      const history = createHistoryPageNumber(10);
      setUp(props, history);
      expect(screen.getByTestId('NumberPagination-number-of-pages')).toHaveTextContent('10');
      expect(screen.getByText('...')).toBeInTheDocument();
      expect(screen.getByTestId('NumberPagination-page1')).toBeInTheDocument();
      expect(screen.queryByTestId('NumberPagination-page2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('NumberPagination-page5')).not.toBeInTheDocument();
      expect(screen.getByTestId('NumberPagination-page6')).toBeInTheDocument();
      expect(screen.getByTestId('NumberPagination-page10')).toHaveClass('active');
      expect(screen.queryByTestId('NumberPagination-page11')).not.toBeInTheDocument();
    });

    it('should render ellipsis and 6 links: 1 and from 6 to 10 and eighth with active class and 10 pages if p is 8, quantity is 20, per page is 2', () => {
      const props = createPaginationProps(20);
      const history = createHistoryPageNumber(8);
      setUp(props, history);
      expect(screen.getByTestId('NumberPagination-number-of-pages')).toHaveTextContent('10');
      expect(screen.getByText('...')).toBeInTheDocument();
      expect(screen.getByTestId('NumberPagination-page1')).toBeInTheDocument();
      expect(screen.queryByTestId('NumberPagination-page2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('NumberPagination-page5')).not.toBeInTheDocument();
      expect(screen.getByTestId('NumberPagination-page6')).toBeInTheDocument();
      expect(screen.getByTestId('NumberPagination-page8')).toHaveClass('active');
      expect(screen.getByTestId('NumberPagination-page10')).toBeInTheDocument();
      expect(screen.queryByTestId('NumberPagination-page11')).not.toBeInTheDocument();
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
      waitFor(() => {
        expect(history.push).toHaveBeenCalledWith('/products?p=1');
      });

      fireEvent.click(screen.getByTestId('NumberPagination-page6'));
      waitFor(() => {
        expect(history.push).toHaveBeenLastCalledWith('/products?p=6');
      });

      fireEvent.click(screen.getByTestId('NumberPagination-page7'));
      waitFor(() => {
        expect(history.push).toHaveBeenLastCalledWith('/products?p=7');
      });

      fireEvent.click(screen.getByTestId('NumberPagination-page8'));
      waitFor(() => {
        expect(history.push).toHaveBeenLastCalledWith('/products?p=8');
      });

      fireEvent.click(screen.getByTestId('NumberPagination-page9'));
      waitFor(() => {
        expect(history.push).toHaveBeenLastCalledWith('/products?p=9');
      });

      fireEvent.click(screen.getByTestId('NumberPagination-page10'));
      waitFor(() => {
        expect(history.push).toHaveBeenLastCalledWith('/products?p=10');
      });

      waitFor(() => {
        expect(history.push).toHaveBeenCalledTimes(6);
      });
    });
  });
});
