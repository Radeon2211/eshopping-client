import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NumberPagination from './NumberPagination';
import {
  createPaginationProps,
  renderAppPart,
  testRouterPushCall,
} from '../../../shared/testUtility/testUtility';

const defaultProps = createPaginationProps();

const setUp = (props = {}, pageNumber = 1, pushFn = jest.fn()) => {
  return renderAppPart(<NumberPagination {...props} />, {
    pathname: '/products',
    search: `?p=${pageNumber}`,
    push: pushFn,
  });
};

describe('<NumberPagination />', () => {
  describe('check how renders', () => {
    it('should render links from 1 to 3 and second with active class without hide-arrow class on arrows if p is 2, quantity is 5, per page is 2', () => {
      setUp(defaultProps, 2);
      expect(screen.getByTestId('NumberPagination-number-of-pages')).toHaveTextContent('3');
      expect(screen.getByTestId('NumberPagination-left-arrow')).not.toHaveClass('hide-arrow');
      expect(screen.getByTestId('NumberPagination-right-arrow')).not.toHaveClass('hide-arrow');
      expect(screen.getByTestId('NumberPagination-page2')).toHaveClass('active');
    });

    it('should render links from 1 to 6 and 10 pages and first with active class if p is 1, quantity is 20, per page is 2', () => {
      const props = createPaginationProps(20);
      setUp(props);
      expect(screen.getByTestId('NumberPagination-number-of-pages')).toHaveTextContent('10');
      expect(screen.getByTestId('NumberPagination-page1')).toHaveClass('active');
      expect(screen.getByTestId('NumberPagination-page6')).toBeInTheDocument();
    });

    it('should render ellipsis and 6 links: 1 and from 6 to 10 and tenth with active class and 10 pages if p is 10, quantity is 20, per page is 2', () => {
      const props = createPaginationProps(20);
      setUp(props, 10);
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
      setUp(props, 8);
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
      setUp(defaultProps);
      expect(screen.getByTestId('NumberPagination-left-arrow')).toHaveClass('hide-arrow');
      expect(screen.getByTestId('NumberPagination-right-arrow')).not.toHaveClass('hide-arrow');
    });

    it('should only right arrow has hide-arrow class', () => {
      setUp(defaultProps, 3);
      expect(screen.getByTestId('NumberPagination-left-arrow')).not.toHaveClass('hide-arrow');
      expect(screen.getByTestId('NumberPagination-right-arrow')).toHaveClass('hide-arrow');
    });

    it('should both arrows have hide-arrow class', () => {
      const props = createPaginationProps(2);
      setUp(props);
      expect(screen.getByTestId('NumberPagination-left-arrow')).toHaveClass('hide-arrow');
      expect(screen.getByTestId('NumberPagination-right-arrow')).toHaveClass('hide-arrow');
    });
  });

  describe('check behaviour of links', () => {
    it('should react to right arrow click (p is 1, quantity is 5, per page is 2)', () => {
      const pushFn = jest.fn();
      setUp(defaultProps, 1, pushFn);
      fireEvent.click(screen.getByTestId('NumberPagination-right-arrow'));
      testRouterPushCall(pushFn, 0, '/products', '?p=2');
    });

    it('should react to left arrow click (p is 3, quantity is 5, per page is 2)', () => {
      const pushFn = jest.fn();
      setUp(defaultProps, 3, pushFn);
      fireEvent.click(screen.getByTestId('NumberPagination-left-arrow'));
      testRouterPushCall(pushFn, 0, '/products', '?p=2');
    });

    it('should react to oth arrows clicks (p is 2, quantity is 5, per page is 2)', () => {
      const pushFn = jest.fn();
      setUp(defaultProps, 2, pushFn);

      fireEvent.click(screen.getByTestId('NumberPagination-left-arrow'));
      testRouterPushCall(pushFn, 0, '/products', '?p=1');

      fireEvent.click(screen.getByTestId('NumberPagination-right-arrow'));
      testRouterPushCall(pushFn, 1, '/products', '?p=3');

      expect(pushFn).toHaveBeenCalledTimes(2);
    });

    it('should react to numbers clicks (p is 8, quantity is 20, per page is 2)', async () => {
      const props = createPaginationProps(20);
      const pushFn = jest.fn();
      setUp(props, 8, pushFn);

      fireEvent.click(screen.getByTestId('NumberPagination-page1'));
      testRouterPushCall(pushFn, 0, '/products', '?p=1');

      fireEvent.click(screen.getByTestId('NumberPagination-page6'));
      testRouterPushCall(pushFn, 1, '/products', '?p=6');

      fireEvent.click(screen.getByTestId('NumberPagination-page7'));
      testRouterPushCall(pushFn, 2, '/products', '?p=7');

      fireEvent.click(screen.getByTestId('NumberPagination-page9'));
      testRouterPushCall(pushFn, 3, '/products', '?p=9');

      fireEvent.click(screen.getByTestId('NumberPagination-page10'));
      testRouterPushCall(pushFn, 4, '/products', '?p=10');

      expect(pushFn).toHaveBeenCalledTimes(5);
    });
  });
});
