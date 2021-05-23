import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CartItemAdded from './CartItemAdded';
import theme from '../../../styled/theme';
import { createProductItem } from '../../../shared/testUtility/testUtility';
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
  id: 'p1',
  sellerUsername: 'user1',
  price: 500.6,
  quantity: 4,
  name: 'product1',
  photo: true,
});

const defaultCart = [{ _id: 'item1', quantity: 3, product: defaultProduct }];

const setUp = (store) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/product/p1' },
    push: jest.fn(),
  };

  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <ThemeProvider theme={theme}>
            <CartItemAdded />
          </ThemeProvider>
        </Router>
      </Provider>,
    ),
    history,
  };
};

afterEach(cleanup);

describe('<CartItemAdded />', () => {
  describe('check how renders', () => {
    it('should render everything correctly if product is in cart and isCartLoading is false', () => {
      const store = createStore(defaultCart, defaultProduct);
      const { asFragment } = setUp(store);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render only <Loader /> if isCartLoading is true', () => {
      const store = createStore(defaultCart, defaultProduct, true);
      const { asFragment } = setUp(store);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render only <Loader /> if given product is not in cart', () => {
      const store = createStore([], defaultProduct, false);
      const { asFragment } = setUp(store);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('check reactions to buttons clicks', () => {
    it('should call push with /cart after go to cart button click', () => {
      const store = createStore(defaultCart, defaultProduct);
      const { history } = setUp(store);
      fireEvent.click(screen.getByRole('button', { name: /go to cart/i }).closest('a'));
      expect(history.push).toHaveBeenCalledWith('/cart');
    });

    it('should call setModal() after buttons clicks', () => {
      const store = createStore(defaultCart, defaultProduct);
      setUp(store);

      expect(store.dispatch).not.toHaveBeenCalled();

      fireEvent.click(screen.getByRole('button', { name: /continue shopping/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.setModal(''));

      fireEvent.click(screen.getByRole('button', { name: /go to cart/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.setModal(''));

      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
