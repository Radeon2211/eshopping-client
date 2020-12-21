/* eslint-disable no-console */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import ProductsAndFilters from './ProductsAndFilters';
import InputPagination from '../Pagination/InputPagination/InputPagination';
import NumberPagination from '../Pagination/NumberPagination/NumberPagination';
import PaginationCounter from '../Pagination/PaginationCounter/PaginationCounter';
import QuantityPerPageController from '../Pagination/QuantityPerPageController';
import { checkProps } from '../../shared/testUtility';
import { pages } from '../../shared/constants';
import theme from '../../styled/theme';

const mockStore = configureMockStore([thunk]);

const createStore = (products, productCount) =>
  mockStore({
    product: {
      products,
      productCount,
    },
    ui: {
      isDataLoading: false,
      maxQuantityPerPage: 2,
    },
  });

const defaultProps = {
  page: pages.ALL_PRODUCTS,
};

const setUp = (store) => {
  return mount(
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <ProductsAndFilters {...defaultProps} />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

describe('<ProductsAndFilters />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(ProductsAndFilters, defaultProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(ProductsAndFilters, {})).not.toBe(null);
    });
  });

  describe('Check if paginations, controller render', () => {
    let wrapper;
    beforeEach(() => {
      const store = createStore([{ _id: 'p1' }], 5);
      wrapper = setUp(store);
    });
    it('Should render <InputPagination />', () => {
      expect(wrapper.find(InputPagination)).toHaveLength(1);
    });
    it('Should render <NumberPagination />', () => {
      expect(wrapper.find(NumberPagination)).toHaveLength(1);
    });
    it('Should render <PaginationCounter />', () => {
      expect(wrapper.find(PaginationCounter)).toHaveLength(1);
    });
    it('Should render <QuantityPerPageController />', () => {
      expect(wrapper.find(QuantityPerPageController)).toHaveLength(1);
    });
  });

  describe('Check if paginations and controller NOT render', () => {
    let wrapper;
    beforeEach(() => {
      const store = createStore(0);
      wrapper = setUp(store);
    });
    it('Should NOT render <InputPagination />', () => {
      expect(wrapper.find(InputPagination)).toHaveLength(0);
    });
    it('Should NOT render <NumberPagination />', () => {
      expect(wrapper.find(NumberPagination)).toHaveLength(0);
    });
    it('Should NOT render <PaginationCounter />', () => {
      expect(wrapper.find(PaginationCounter)).toHaveLength(0);
    });
    it('Should NOT render <QuantityPerPageController />', () => {
      expect(wrapper.find(QuantityPerPageController)).toHaveLength(0);
    });
  });
});
