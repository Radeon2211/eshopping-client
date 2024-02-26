import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ProductDetails from './ProductDetails';
import {
  defaultUserProfile,
  renderAppPart,
  testRouterPushCall,
} from '../../shared/testUtility/testUtility';
import { defaultScrollToConfig, modalTypes, productConditions } from '../../shared/constants';
import noPhoto from '../../images/no-photo.png';
import * as actions from '../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const defaultProductId = '123';

const defaultProductDetails = {
  _id: defaultProductId,
  seller: { username: 'user1' },
  condition: productConditions.NOT_APPLICABLE,
  photo: true,
  price: 2.5,
  description: '',
  quantity: 5,
  name: 'testName',
  quantitySold: 0,
  buyerQuantity: 0,
};

const defaultCart = [{ _id: '123', product: 'productId', quantity: 1 }];

const defaultStore = {
  ui: { isDataLoading: false },
  auth: { profile: { ...defaultUserProfile, username: 'user1' }, cart: defaultCart },
  product: {
    productDetails: defaultProductDetails,
  },
};

const setUp = (storePart, pushFn = jest.fn()) => {
  const store = storePart
    ? mockStore({
        ...defaultStore,
        ...storePart,
      })
    : mockStore(defaultStore);
  store.dispatch = jest.fn();

  return {
    ...renderAppPart(<ProductDetails />, {
      pathname: `/product/${defaultProductId}`,
      store,
      push: pushFn,
    }),
    store,
  };
};

jest.mock('../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../store/actions/indexActions.js'),
  fetchProductDetails: (productId) => productId,
  setProductDetails: () => {},
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: defaultProductId,
  }),
}));

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('<ProductDetails />', () => {
  describe('check how renders', () => {
    describe('general elements and meta tags', () => {
      it('should render only <Loader /> if productDetails is undefined', async () => {
        const store = { product: { productDetails: undefined } };
        setUp(store);
        expect(screen.getByTestId('Loader')).toBeInTheDocument();
        await waitFor(() => {
          expect(document.title).toEqual('Offer is loading... - E-Shopping');
        });
      });

      it('should render only info that there is a problem to fetch product details', async () => {
        const store = { product: { productDetails: null } };
        setUp(store);
        expect(
          screen.getByText(/such product does not exist or has already been sold/i),
        ).toBeInTheDocument();
        await waitFor(() => {
          expect(document.title).toEqual('Offer does not exist - E-Shopping');
        });
      });

      it(`should render everything correctly if user is a product's owner`, async () => {
        const store = {
          product: {
            productDetails: {
              ...defaultProductDetails,
              name: 'Test name',
              description: 'testDescription',
              quantitySold: 1,
              buyerQuantity: 1,
            },
          },
        };
        setUp(store);
        expect(screen.getByTestId('ProductDetails-quantity-sold')).toHaveTextContent(
          '1 person bought 1 unit',
        );
        await waitFor(() => {
          expect(document.title).toEqual('Test name - E-Shopping');
        });
      });
    });

    describe('check single items', () => {
      it('should render quantity sold node - "2 people bought 3 units"', () => {
        const store = {
          product: {
            productDetails: {
              ...defaultProductDetails,
              quantitySold: 3,
              buyerQuantity: 2,
            },
          },
        };
        setUp(store);
        expect(screen.getByTestId('ProductDetails-quantity-sold')).toHaveTextContent(
          '2 people bought 3 units',
        );
      });

      it('should render quantity sold node - "1 person bought 4 units"', () => {
        const store = {
          product: {
            productDetails: {
              ...defaultProductDetails,
              quantitySold: 4,
              buyerQuantity: 1,
            },
          },
        };
        setUp(store);
        expect(screen.getByTestId('ProductDetails-quantity-sold')).toHaveTextContent(
          '1 person bought 4 units',
        );
      });

      it('should render no description if it is empty and NOT render quantity sold node if quantitySold is 0', () => {
        setUp();
        expect(screen.getByTestId('ProductDetails-no-description')).toBeInTheDocument();
        expect(screen.queryByTestId('ProductDetails-full-description')).not.toBeInTheDocument();
        expect(screen.queryByTestId('ProductDetails-quantity-sold')).not.toBeInTheDocument();
      });

      it('should render default photo', () => {
        const store = {
          product: {
            productDetails: {
              ...defaultProductDetails,
              photo: false,
            },
          },
        };
        setUp(store);
        expect(screen.getByAltText(defaultProductDetails.name)).toHaveAttribute('src', noPhoto);
      });

      it(`should NOT render edit and delete buttons if user is not admin and not a product's owner`, () => {
        const store = {
          product: {
            productDetails: {
              ...defaultProductDetails,
              seller: { username: 'user2' },
            },
          },
        };
        setUp(store);
        expect(screen.queryByTestId('ProductDetails-edit-button')).not.toBeInTheDocument();
        expect(screen.queryByTestId('ProductDetails-delete-button')).not.toBeInTheDocument();
      });

      it(`should NOT render edit button and should render delete button if user not a product's owner but is an admin`, () => {
        const store = {
          auth: {
            profile: { ...defaultUserProfile, username: 'user2', isAdmin: true },
            cart: defaultCart,
          },
        };
        setUp(store);
        expect(screen.queryByTestId('ProductDetails-edit-button')).not.toBeInTheDocument();
        expect(screen.getByTestId('ProductDetails-delete-button')).toBeInTheDocument();
      });

      it('should call push with correct path after clicking on seller link', () => {
        const pushFn = jest.fn();
        setUp(defaultStore, pushFn);
        fireEvent.click(screen.getByTestId('ProductDetails-seller-link'));
        testRouterPushCall(pushFn, 0, `/user/${defaultProductDetails.seller.username}`, '?p=1');
      });
    });
  });

  describe('check useEffect() and redux actions calling', () => {
    it('should call fetchProductDetails() after mounting', () => {
      const { store } = setUp();
      expect(store.dispatch).toHaveBeenCalledWith(actions.fetchProductDetails(defaultProductId));
    });

    it('should call setProductDetails() after unmounting', () => {
      const { store, unmount } = setUp();
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      unmount();
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.setProductDetails());
      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('should call scrollTo() after mounting', () => {
      setUp();
      expect(window.scrollTo).toHaveBeenCalledWith(defaultScrollToConfig);
    });

    it('should call setModal() after clicking at edit and delete buttons', () => {
      const { store } = setUp();

      fireEvent.click(screen.getByTestId('ProductDetails-edit-button'));
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.setModal(modalTypes.EDIT_PRODUCT));

      fireEvent.click(screen.getByTestId('ProductDetails-delete-button'));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        3,
        actions.setModal(modalTypes.DELETE_PRODUCT),
      );

      expect(store.dispatch).toHaveBeenCalledTimes(3);
    });
  });
});
