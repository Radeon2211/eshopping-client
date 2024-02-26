import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import matchMediaPolyfill from 'mq-polyfill';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Products from './Products';
import {
  defaultUserProfile,
  createProductItem,
  renderAppPart,
} from '../../shared/testUtility/testUtility';
import {
  productPages,
  defaultProductsPerPage,
  defaultScrollToConfig,
} from '../../shared/constants';
import * as actions from '../../store/actions/indexActions';
import useLastLocation from '../../shared/useLastLocation';

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
    ...renderAppPart(<Products {...props} />, {
      pathname: `/products`,
      search,
      store,
    }),
    store,
  };
};

jest.mock('../../store/actions/indexActions.js', () => ({
  fetchProducts: (queryParams, pageType, username) => ({
    queryParams,
    pageType,
    username,
  }),
}));

beforeAll(() => {
  matchMediaPolyfill(window);
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
    }).dispatchEvent(new this.Event('resize'));
  };

  window.scrollTo = jest.fn();
});

jest.mock('../../shared/useLastLocation', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('<Products />', () => {
  describe('check how renders', () => {
    it('should render everything correctly with default params and two products', async () => {
      window.resizeTo(1920, 1080);
      setUp();
      expect(screen.getAllByTestId('ProductItem')).toHaveLength(2);
      await waitFor(() => {
        expect(document.title).toEqual('E-Shopping - Buy and sell');
      });
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

  describe('check useEffect()', () => {
    it('should call fetchProducts() with correct arguments', () => {
      const search = '?p=1&name=wellingtons';
      const { store } = setUp(search);
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.fetchProducts(search, productPages.ALL_PRODUCTS),
      );
    });

    it('should call scrollTo() if last rendered route was ProductDetails', () => {
      useLastLocation.mockImplementation(() => ({
        pathname: '/product/p1',
      }));
      setUp();
      expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it('should NOT call scrollTo() if last rendered route was NOT ProductDetails', () => {
      useLastLocation.mockImplementation(() => ({
        pathname: '/cart',
      }));
      setUp();
      expect(window.scrollTo).toHaveBeenCalledWith(defaultScrollToConfig);
    });
  });
});
