/* eslint-disable no-console */
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import ProductsAndFilters from './ProductsAndFilters';
import Filters from '../Filters/Filters';
import InputPagination from '../Pagination/InputPagination/InputPagination';
import NumberPagination from '../Pagination/NumberPagination/NumberPagination';
import PaginationCounter from '../Pagination/PaginationCounter/PaginationCounter';
import ProductsPerPageController from '../Pagination/ProductsPerPageController';
import { checkProps } from '../../shared/testUtility';
import { pages, PRODUCTS_PER_PAGE } from '../../shared/constants';
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
      productsPerPage: PRODUCTS_PER_PAGE,
    },
  });

const defaultProps = {
  page: pages.ALL_PRODUCTS,
};

const setUp = (store, search = 'p=1') => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search },
    replace: jest.fn(),
  };
  return mount(
    <Provider store={store}>
      <Router history={history}>
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

  describe('Check how paginations and controller render', () => {
    it('Should render everything', () => {
      const store = createStore([{ _id: 'p1' }], 5);
      const wrapper = setUp(store);
      expect(wrapper.find(InputPagination)).toHaveLength(1);
      expect(wrapper.find(NumberPagination)).toHaveLength(1);
      expect(wrapper.find(PaginationCounter)).toHaveLength(1);
      expect(wrapper.find(ProductsPerPageController)).toHaveLength(1);
    });

    it('Should NOT render anything', () => {
      const store = createStore([], 0);
      const wrapper = setUp(store);
      expect(wrapper.find(InputPagination)).toHaveLength(0);
      expect(wrapper.find(NumberPagination)).toHaveLength(0);
      expect(wrapper.find(PaginationCounter)).toHaveLength(0);
      expect(wrapper.find(ProductsPerPageController)).toHaveLength(0);
    });
  });

  describe('Check how <Filters /> render', () => {
    it('Should render if products length is 1', () => {
      const store = createStore([{ _id: 'p1' }], 1);
      const wrapper = setUp(store);
      expect(wrapper.find(Filters)).toHaveLength(1);
    });

    it('Should render if in url is p and sth else than name', () => {
      const store = createStore([], 1);
      const wrapper = setUp(store, '?p=1&minPrice=10');
      expect(wrapper.find(Filters)).toHaveLength(1);
    });

    it('Should render if in url is sth expect p and name', () => {
      const store = createStore([], 1);
      const wrapper = setUp(store, '?minPrice=10');
      expect(wrapper.find(Filters)).toHaveLength(1);
    });

    it('Should NOT render if in url is name', () => {
      const store = createStore([], 0);
      const wrapper = setUp(store, '?name=test-name');
      expect(wrapper.find(Filters)).toHaveLength(0);
    });

    it('Should NOT render if in url is p and sth else than name', () => {
      const store = createStore([], 0);
      const wrapper = setUp(store, '?p=1&minPrice=10');
      expect(wrapper.find('[data-test="unavailable-heading"]')).toHaveLength(0);
    });
  });
});
