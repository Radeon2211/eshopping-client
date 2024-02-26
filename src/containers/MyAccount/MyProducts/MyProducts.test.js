import { waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MyProducts from './MyProducts';
import {
  createProductItem,
  defaultUserProfile,
  renderAppPart,
} from '../../../shared/testUtility/testUtility';
import {
  productPages,
  productConditions,
  defaultProductsPerPage,
  defaultScrollToConfig,
} from '../../../shared/constants';
import * as actions from '../../../store/actions/indexActions';
import useLastLocation from '../../../shared/useLastLocation';

const mockStore = configureMockStore([thunk]);

const defaultSearch = '?p=1';

const defaultProps = {
  userProfile: defaultUserProfile,
};

const defaultProducts = [
  createProductItem({
    id: 'p1',
    name: 'Wellingtons',
    price: 10,
    quantity: 5,
    buyerQuantity: 2,
    quantitySold: 3,
    condition: productConditions.NEW,
    photo: true,
    sellerUsername: 'sellerUser',
  }),
];

const setUp = () => {
  const store = mockStore({
    product: {
      products: defaultProducts,
      productCount: 1,
      minPrice: 10,
      maxPrice: 10,
    },
    ui: {
      productsPerPage: defaultProductsPerPage,
      isDataLoading: false,
    },
  });
  store.dispatch = jest.fn();

  return {
    ...renderAppPart(<MyProducts {...defaultProps} />, {
      pathname: '/my-account/products',
      search: defaultSearch,
      store,
    }),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  fetchProducts: (queryParams, pageType, username) => ({
    queryParams,
    pageType,
    username,
  }),
}));

jest.mock('../../../shared/useLastLocation', () => ({
  __esModule: true,
  default: jest.fn(),
}));

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('<MyProducts />', () => {
  describe('check how renders', () => {
    it('should render everything correctly with given default data', async () => {
      setUp();
      expect(screen.getAllByTestId('ProductItem')).toHaveLength(1);
      await waitFor(() => {
        expect(document.title).toEqual('Your offers - E-Shopping');
      });
    });
  });

  describe('check useEffect()', () => {
    it('should call fetchProducts()', () => {
      const { store } = setUp();
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.fetchProducts(defaultSearch, productPages.MY_PRODUCTS),
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
