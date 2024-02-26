import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Cart from './Cart';
import {
  createCartItem,
  renderAppPart,
  testRouterPushCall,
} from '../../shared/testUtility/testUtility';
import { modalTypes, defaultScrollToConfig } from '../../shared/constants';
import * as actions from '../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const defaultCartItem = createCartItem({
  sellerUsername: 'user1',
  quantity: 5,
  productId: 'p1',
  price: 499.97,
});

const location = {
  pathname: '/cart',
};

const setUp = (cart, isCartLoading = false, pushFn = jest.fn()) => {
  const store = mockStore({
    auth: { cart },
    ui: { isCartLoading },
  });
  store.dispatch = jest.fn();

  return {
    ...renderAppPart(<Cart />, {
      pathname: location.pathname,
      store,
      push: pushFn,
    }),
    store,
  };
};

jest.mock('../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../store/actions/indexActions.js'),
  fetchCart: () => {},
  goToTransaction: (history) => history,
}));

const mockedUseNavigateFn = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigateFn,
}));

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('<Cart />', () => {
  describe('check how renders', () => {
    it('should render everything correctly with one cart item', async () => {
      setUp([defaultCartItem]);
      expect(screen.getAllByTestId('CartAndTransactionItems-item')).toHaveLength(1);
      expect(screen.getAllByTestId('CartItem')).toHaveLength(1);
      await waitFor(() => {
        expect(document.title).toEqual('Your cart - E-Shopping');
      });
    });

    it('should render empty cart', () => {
      setUp([]);
      expect(screen.getByTestId('Cart-empty-cart')).toBeInTheDocument();
    });

    it('should render only <Loader />', () => {
      setUp(undefined, true);
      expect(screen.getByTestId('Loader')).toBeInTheDocument();
    });

    it('should render that there is a problem to fetch cart', () => {
      setUp(null);
      expect(screen.getByTestId('Cart-error')).toBeInTheDocument();
    });

    it('should render <LoadingOverlay /> and go to summary button should be disabled', () => {
      setUp(
        [
          createCartItem({
            sellerUsername: 'user1',
            quantity: 5,
            productId: 'p1',
            price: 499.97,
          }),
        ],
        true,
      );
      expect(screen.getByTestId('LoadingOverlay')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /go to summary/i })).toBeDisabled();
    });
  });

  describe('check behaviour after clicking and calling redux actions', () => {
    it('should call push with defaultAppPath after click on link in empty cart', () => {
      const pushFn = jest.fn();
      setUp([], false, pushFn);
      fireEvent.click(screen.getByTestId('Cart-default-path-link'));
      testRouterPushCall(pushFn, 0, '/products', '?p=1');
    });

    it('should call fetchCart() and scrollTo() after mounting and then goToTransaction() and setModal()', () => {
      const { store } = setUp([defaultCartItem]);

      expect(window.scrollTo).toHaveBeenCalledWith(defaultScrollToConfig);
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.fetchCart());

      fireEvent.click(screen.getByRole('button', { name: /clear the cart/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.setModal(modalTypes.CLEAR_CART));

      fireEvent.click(screen.getByRole('button', { name: /go to summary/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(
        3,
        actions.goToTransaction(mockedUseNavigateFn),
      );

      expect(store.dispatch).toHaveBeenCalledTimes(3);
    });
  });
});
