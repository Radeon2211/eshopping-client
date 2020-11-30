/* eslint-disable no-console */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import ProductsAndFilters from './ProductsAndFilters';
import * as SC from './ProductsAndFilters.sc';
import InputPagination from '../Pagination/InputPagination/InputPagination';
import NumberPagination from '../Pagination/NumberPagination/NumberPagination';
import PaginationCounter from '../Pagination/PaginationCounter/PaginationCounter';
import QuantityPerPageController from '../Pagination/QuantityPerPageController';
import * as FiltersSC from '../Filters/Filters.sc';
import { checkProps } from '../../shared/utility';
import { pages } from '../../shared/constants';
import theme from '../../styled/theme';

const mockStore = configureMockStore([thunk]);

const setUp = (store, props = {}) => {
  return mount(
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <ProductsAndFilters {...props} />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

describe('<ProductsAndFilters />', () => {
  describe('Check prop types', () => {
    const expectedProps = {
      page: pages.ALL_PRODUCTS,
    };
    it('Should NOT throw a warning', () => {
      expect(checkProps(ProductsAndFilters, expectedProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(ProductsAndFilters, {})).not.toBe(null);
    });
  });

  describe('Check if paginations, controller and filters toggler render', () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        page: pages.ALL_PRODUCTS,
      };
      const store = mockStore({
        product: {
          productCount: 5,
        },
        ui: {
          isDataLoading: false,
          maxQuantityPerPage: 2,
        },
      });
      wrapper = setUp(store, props);
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
      const props = {
        page: pages.ALL_PRODUCTS,
      };
      const store = mockStore({
        product: {
          productCount: 0,
        },
        ui: {
          isDataLoading: false,
          maxQuantityPerPage: 2,
        },
      });
      wrapper = setUp(store, props);
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

  describe('Check <FiltersToggler /> behaviour', () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        page: pages.ALL_PRODUCTS,
      };
      const store = mockStore({
        product: {
          productCount: 2,
          maxPrice: 10000,
        },
        ui: {
          isDataLoading: false,
          maxQuantityPerPage: 2,
        },
      });
      wrapper = setUp(store, props);
    });
    it('Should render <FiltersSC.Wrapper />', () => {
      const originalError = console.error;
      console.error = jest.fn();
      const filtersToggler = wrapper.find(SC.FiltersToggler);
      filtersToggler.simulate('click');
      expect(wrapper.find(FiltersSC.Wrapper)).toHaveLength(1);
      console.error = originalError;
    });
    it('Should NOT render <FiltersSC.Wrapper />', () => {
      expect(wrapper.find(FiltersSC.Wrapper)).toHaveLength(0);
    });
  });
});
