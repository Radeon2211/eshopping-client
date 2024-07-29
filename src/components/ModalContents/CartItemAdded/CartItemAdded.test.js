import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CartItemAdded from './CartItemAdded';
import {
  createProductItem,
  renderAppPart,
  testRouterPushCall,
} from '../../../shared/testUtility/testUtility';
import * as actions from '../../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const createStore = (cart, productDetails, isCartLoading = false) => {
  const store = mockStore({
    auth: { cart },
    product: { productDetails },
    ui: { isCartLoading },
  });
  store.dispatch = jest.fn();
  return store;
};

const defaultProduct = createProductItem({
  _id: 'p1',
  sellerUsername: 'user1',
  price: 500.6,
  quantity: 4,
  name: 'product1',
  photo: true,
  seller: {
    username: 'user1',
  },
});

const defaultCart = [{ _id: 'item1', quantity: 3, product: defaultProduct }];

const setUp = (store, pushFn = jest.fn()) => {
  return {
    ...renderAppPart(<CartItemAdded />, {
      pathname: '/product/p1',
      push: pushFn,
      store,
    }),
  };
};

describe('<CartItemAdded />', () => {
  describe('check how renders', () => {
    it('should render everything correctly if product is in cart and isCartLoading is false', () => {
      const store = createStore(defaultCart, defaultProduct);
      setUp(store);
      expect(screen.getByTestId('CartItemAdded-price-and-quantity')).toHaveTextContent(
        '$1,501.80 (total in the cart 3 x $500.60)',
      );
      expect(screen.getByTestId('CartItemAdded-quantity-and-name')).toHaveTextContent(
        '3 x product1',
      );
    });

    it('should render only <Loader /> if isCartLoading is true', () => {
      const store = createStore(defaultCart, defaultProduct, true);
      setUp(store);
      expect(screen.getByTestId('Loader')).toBeInTheDocument();
    });

    it('should render only <Loader /> if given product is not in cart', () => {
      const store = createStore([], defaultProduct, false);
      setUp(store);
      expect(screen.getByTestId('Loader')).toBeInTheDocument();
    });
  });

  describe('check reactions to buttons clicks', () => {
    it('should call push with /cart after go to cart button click', () => {
      const store = createStore(defaultCart, defaultProduct);
      const pushFn = jest.fn();
      setUp(store, pushFn);
      fireEvent.click(screen.getByRole('button', { name: /go to cart/i }).closest('a'));
      testRouterPushCall(pushFn, 0, '/cart');
    });

    it('should call setModal() after buttons clicks', () => {
      const store = createStore(defaultCart, defaultProduct);
      setUp(store);

      expect(store.dispatch).not.toHaveBeenCalled();

      fireEvent.click(screen.getByRole('button', { name: /continue shopping/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.setModal(null));

      fireEvent.click(screen.getByRole('button', { name: /go to cart/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.setModal(null));

      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
