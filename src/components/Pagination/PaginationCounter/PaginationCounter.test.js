import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import PaginationCounter from './PaginationCounter';
import { checkProps, createHistoryPageNumber } from '../../../shared/testUtility/testUtility';
import { listItemTypes } from '../../../shared/constants';

const createProps = (itemQuantity, itemsType, quantityPerPage) => ({
  itemQuantity,
  itemsType,
  quantityPerPage,
});

const setUp = (props, history) => {
  return render(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <PaginationCounter {...props} />
      </ThemeProvider>
    </Router>,
  );
};

afterEach(cleanup);

describe('<PaginationCounter />', () => {
  describe('check prop types', () => {
    it('should NOT throw a warning if itemsType is product', () => {
      const expectedProps = createProps(5, listItemTypes.PRODUCT, 2);
      expect(checkProps(PaginationCounter, expectedProps)).toBeUndefined();
    });

    it('should NOT throw a warning if itemsType is order', () => {
      const expectedProps = createProps(5, listItemTypes.ORDER, 2);
      expect(checkProps(PaginationCounter, expectedProps)).toBeUndefined();
    });

    it('should throw a warning if itemsType is other than product and order', () => {
      const expectedProps = createProps(5, 'incorrectType', 2);
      expect(checkProps(PaginationCounter, expectedProps)).not.toBe(null);
    });

    it('should throw a warning if no props are passed', () => {
      expect(checkProps(PaginationCounter, {})).not.toBe(null);
    });
  });

  describe('check if correct text render', () => {
    it('should be 1 - 2 of 5 products', () => {
      const props = createProps(5, listItemTypes.PRODUCT, 2);
      const history = createHistoryPageNumber(1);
      setUp(props, history);
      expect(screen.getByText('1 - 2 of 5 products')).toBeInTheDocument();
    });

    it('should be 1 - 1 of 1 product', () => {
      const props = createProps(1, listItemTypes.PRODUCT, 1);
      const history = createHistoryPageNumber(1);
      setUp(props, history);
      expect(screen.getByText('1 - 1 of 1 product')).toBeInTheDocument();
    });

    it('should be 3 - 4 of 5 products', () => {
      const props = createProps(5, listItemTypes.PRODUCT, 2);
      const history = createHistoryPageNumber(2);
      setUp(props, history);
      expect(screen.getByText('3 - 4 of 5 products')).toBeInTheDocument();
    });

    it('should be 5 - 7 of 7 orders', () => {
      const props = createProps(7, listItemTypes.ORDER, 4);
      const history = createHistoryPageNumber(2);
      setUp(props, history);
      expect(screen.getByText('5 - 7 of 7 orders')).toBeInTheDocument();
    });

    it('should be 1 - 1 of 10 orders', () => {
      const props = createProps(10, listItemTypes.ORDER, 1);
      const history = createHistoryPageNumber(1);
      setUp(props, history);
      expect(screen.getByText('1 - 1 of 10 orders')).toBeInTheDocument();
    });

    it('should be 1 - 1 of 1 order', () => {
      const props = createProps(1, listItemTypes.ORDER, 1);
      const history = createHistoryPageNumber(1);
      setUp(props, history);
      expect(screen.getByText('1 - 1 of 1 order')).toBeInTheDocument();
    });

    it('should be 10 - 10 of 10 orders', () => {
      const props = createProps(10, listItemTypes.ORDER, 1);
      const history = createHistoryPageNumber(10);
      setUp(props, history);
      expect(screen.getByText('10 - 10 of 10 orders')).toBeInTheDocument();
    });
  });
});
