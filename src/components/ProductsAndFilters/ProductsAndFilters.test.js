import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import matchMediaPolyfill from 'mq-polyfill';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import ProductsAndFilters from './ProductsAndFilters';
import { checkProps, createProductItem } from '../../shared/testUtility/testUtility';
import { pages, PRODUCTS_PER_PAGE } from '../../shared/constants';
import theme from '../../styled/theme';

const mockStore = configureMockStore([thunk]);

const createStore = (products, productCount, minPrice, maxPrice) =>
  mockStore({
    product: {
      products,
      productCount,
      minPrice,
      maxPrice,
    },
    ui: {
      isDataLoading: false,
      productsPerPage: PRODUCTS_PER_PAGE,
    },
  });

const defaultProducts = [
  createProductItem({
    id: 'p1',
    sellerUsername: 'user1',
    price: 10.6,
    quantity: 4,
    name: 'product1',
  }),
  createProductItem({
    id: 'p2',
    sellerUsername: 'user1',
    price: 299.98,
    quantity: 6,
    name: 'product2',
  }),
];

const setUp = (store, search = '?p=1') => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search },
    replace: jest.fn(),
  };

  return render(
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <ProductsAndFilters page={pages.ALL_PRODUCTS} />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

beforeAll(() => {
  matchMediaPolyfill(window);
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
    }).dispatchEvent(new this.Event('resize'));
  };
});

afterEach(cleanup);

describe('<ProductsAndFilters />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('Check prop types', () => {
    it('should NOT throw a warning', () => {
      const props = {
        page: pages.ALL_PRODUCTS,
      };
      expect(checkProps(ProductsAndFilters, props)).toBeUndefined();
    });

    it('should throw a warning', () => {
      expect(checkProps(ProductsAndFilters, {})).not.toBe(null);
    });
  });

  describe('Check how renders', () => {
    it('should render everything correctly with two products', () => {
      const store = createStore(defaultProducts, defaultProducts.length, 10.6, 299.98);
      window.resizeTo(1920, 1080);
      const { asFragment } = setUp(store);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render only <ProductList />', () => {
      const store = createStore([], 0);
      const { asFragment } = setUp(store);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render <Filters /> if at least two params (except p)', () => {
      const store = createStore([], 0);
      window.resizeTo(1920, 1080);
      setUp(store, '?p=1&name=testName&minPrice=10');
      expect(screen.getByTestId('Filters')).toBeInTheDocument();
    });

    it('should render <Filters /> if one param (except p)', () => {
      const store = createStore([], 0);
      window.resizeTo(1920, 1080);
      setUp(store, '?p=1&minPrice=10');
      expect(screen.getByTestId('Filters')).toBeInTheDocument();
    });

    it('should NOT render product list section', () => {
      const store = createStore(undefined, 2);
      setUp(store);
      expect(
        screen.queryByTestId('ProductsAndFilters-product-list-section'),
      ).not.toBeInTheDocument();
    });
  });
});
