import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import BottomPagination from './BottomPagination';
import { checkProps, createHistoryPageNumber } from '../../../shared/testUtility/testUtility';
import { listItemTypes } from '../../../shared/constants';

const createProps = (itemQuantity, itemsType, quantityPerPage) => ({
  itemQuantity,
  itemsType,
  quantityPerPage,
});

const defaultHistory = createHistoryPageNumber();

const setUp = (props) => {
  return mount(
    <Router history={defaultHistory}>
      <ThemeProvider theme={theme}>
        <BottomPagination {...props} />
      </ThemeProvider>
    </Router>,
  );
};

describe('<BottomPagination />', () => {
  describe('check prop types', () => {
    it('should NOT throw a warning if itemsType is product', () => {
      const expectedProps = createProps(5, listItemTypes.PRODUCT, 2);
      expect(checkProps(BottomPagination, expectedProps)).toBeUndefined();
    });

    it('should NOT throw a warning if itemsType is order', () => {
      const expectedProps = createProps(5, listItemTypes.ORDER, 2);
      expect(checkProps(BottomPagination, expectedProps)).toBeUndefined();
    });

    it('should throw a warning if itemsType is other than product and order', () => {
      const expectedProps = createProps(5, 'incorrectType', 2);
      expect(checkProps(BottomPagination, expectedProps)).not.toBe(null);
    });

    it('should throw a warning if no props are passed', () => {
      expect(checkProps(BottomPagination, {})).not.toBe(null);
    });
  });

  it('should render PaginationCounter and NumberPagination with correct props', () => {
    const props = createProps(5, listItemTypes.PRODUCT, 2);
    const wrapper = setUp(props);

    const paginationCounter = wrapper.find('PaginationCounter');
    expect(paginationCounter.prop('itemQuantity')).toEqual(5);
    expect(paginationCounter.prop('itemsType')).toEqual(listItemTypes.PRODUCT);
    expect(paginationCounter.prop('quantityPerPage')).toEqual(2);

    const numberPagination = wrapper.find('NumberPagination');
    expect(numberPagination.prop('itemQuantity')).toEqual(5);
    expect(numberPagination.prop('quantityPerPage')).toEqual(2);
  });
});
