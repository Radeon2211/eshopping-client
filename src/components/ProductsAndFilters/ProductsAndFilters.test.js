import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import matchMediaPolyfill from 'mq-polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ProductsAndFilters from './ProductsAndFilters';
import { createProductItem, renderAppPart } from '../../shared/testUtility/testUtility';
import { productPages, defaultProductsPerPage } from '../../shared/constants';

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
      productsPerPage: defaultProductsPerPage,
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
  return renderAppPart(<ProductsAndFilters page={productPages.ALL_PRODUCTS} />, {
    pathname: '/products',
    search,
    store,
  });
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

describe('<ProductsAndFilters />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('check how renders', () => {
    it('should render everything correctly with two products', () => {
      const store = createStore(defaultProducts, defaultProducts.length, 10.6, 299.98);
      window.resizeTo(1201, 800);
      setUp(store);
      expect(screen.getByTestId('Filters'));
      expect(screen.getByTestId('ProductsAndFilters-product-list-section'));
      expect(screen.getAllByTestId('ProductItem')).toHaveLength(2);
    });

    it('should render only <ProductList /> if product array is empty', () => {
      const store = createStore([], 0);
      window.resizeTo(1199, 800);
      setUp(store);
      expect(screen.queryByTestId('Filters')).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('ProductsAndFilters-product-list-section'),
      ).not.toBeInTheDocument();
      expect(screen.getByTestId('ProductList'));
    });

    it('should render <Filters /> if at least two params (except p)', () => {
      const store = createStore([], 0);
      window.resizeTo(1201, 800);
      setUp(store, '?p=1&name=testName&minPrice=10');
      expect(screen.getByTestId('Filters'));
    });

    it('should render <Filters /> if one param (except p)', () => {
      const store = createStore([], 0);
      window.resizeTo(1201, 800);
      setUp(store, '?p=1&minPrice=10');
      expect(screen.getByTestId('Filters'));
    });

    it('should NOT render product list section if products are undefined', () => {
      const store = createStore(undefined, 2);
      setUp(store);
      expect(
        screen.queryByTestId('ProductsAndFilters-product-list-section'),
      ).not.toBeInTheDocument();
    });
  });
});
