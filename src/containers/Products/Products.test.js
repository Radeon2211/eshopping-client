import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import matchMediaPolyfill from 'mq-polyfill';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Products from './Products';
import theme from '../../styled/theme';
import { defaultUserProfile, createProductItem } from '../../shared/testUtility/testUtility';
import { pages, defaultProductsPerPage } from '../../shared/constants';
import * as actions from '../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

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

const setUp = (search = '?p=1') => {
  const props = {
    location: { pathname: '/products', search },
  };

  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search },
  };

  const store = mockStore({
    auth: {
      profile: defaultUserProfile,
    },
    product: {
      products: defaultProducts,
      productCount: defaultProducts.length,
      minPrice: 10.6,
      maxPrice: 299.98,
    },
    ui: {
      productsPerPage: defaultProductsPerPage,
      isDataLoading: false,
    },
  });
  store.dispatch = jest.fn();

  return {
    ...render(
      <Router history={history}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Products {...props} />
          </ThemeProvider>
        </Provider>
      </Router>,
    ),
    store,
  };
};

jest.mock('../../store/actions/indexActions.js', () => ({
  fetchProducts: jest.fn().mockImplementation((queryParams, pageType, username) => ({
    queryParams,
    pageType,
    username,
  })),
}));

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

describe('<Products />', () => {
  describe('Check how renders', () => {
    it('should render everything correctly with default params and two products', () => {
      window.resizeTo(1920, 1080);
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render heading with `Results for "mushrooms"`', () => {
      setUp('?p=1&name=mushrooms');
      expect(screen.getByTestId('Products-heading')).toHaveTextContent('Results for "mushrooms"');
    });

    it('should render heading with `Results for "wellingtons"` if wellingtons is in last occurrence of name param', () => {
      setUp('?p=1&name=mushrooms&name=wellingtons');
      expect(screen.getByTestId('Products-heading')).toHaveTextContent('Results for "wellingtons"');
    });
  });

  describe('Check useEffect()', () => {
    it('should call fetchProducts() with correct arguments', () => {
      const search = '?p=1&name=wellingtons';
      const { store } = setUp(search);
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.fetchProducts(search, pages.ALL_PRODUCTS),
      );
    });
  });
});
