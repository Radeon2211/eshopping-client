import React from 'react';
import { render, cleanup } from '@testing-library/react';
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
  describe('Check prop types', () => {
    it('Should NOT throw a warning if itemsType is product', () => {
      const expectedProps = createProps(5, listItemTypes.PRODUCT, 2);
      expect(checkProps(PaginationCounter, expectedProps)).toBeUndefined();
    });

    it('Should NOT throw a warning if itemsType is order', () => {
      const expectedProps = createProps(5, listItemTypes.ORDER, 2);
      expect(checkProps(PaginationCounter, expectedProps)).toBeUndefined();
    });

    it('Should throw a warning if itemsType is other than product and order', () => {
      const expectedProps = createProps(5, 'incorrectType', 2);
      expect(checkProps(PaginationCounter, expectedProps)).not.toBe(null);
    });

    it('Should throw a warning if no props are passed', () => {
      expect(checkProps(PaginationCounter, {})).not.toBe(null);
    });
  });

  describe('Check if correct text render', () => {
    it('Should be 1 - 2 of 5 products', () => {
      const props = createProps(5, listItemTypes.PRODUCT, 2);
      const history = createHistoryPageNumber(1);
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should be 1 - 1 of 1 products', () => {
      const props = createProps(1, listItemTypes.PRODUCT, 1);
      const history = createHistoryPageNumber(1);
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should be 3 - 4 of 5 products', () => {
      const props = createProps(5, listItemTypes.PRODUCT, 2);
      const history = createHistoryPageNumber(2);
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should be 5 - 7 of 7 orders', () => {
      const props = createProps(7, listItemTypes.ORDER, 4);
      const history = createHistoryPageNumber(2);
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should be 1 - 1 of 10 orders', () => {
      const props = createProps(10, listItemTypes.ORDER, 1);
      const history = createHistoryPageNumber(1);
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should be 1 - 1 of 1 order', () => {
      const props = createProps(1, listItemTypes.ORDER, 1);
      const history = createHistoryPageNumber(1);
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should be 10 - 10 of 10 orders', () => {
      const props = createProps(10, listItemTypes.ORDER, 1);
      const history = createHistoryPageNumber(10);
      const { asFragment } = setUp(props, history);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
