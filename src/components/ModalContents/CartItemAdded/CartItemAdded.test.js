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

const mockStore = configureMockStore([thunk]);

const createStore = (cart, productDetails, isCartLoading) =>
  mockStore({
    auth: { cart },
    product: { productDetails },
    ui: { isCartLoading },
  });

const defaultProduct = createProductItem({
  id: 'p1',
  sellerUsername: 'user1',
  price: 500.6,
  quantity: 4,
  name: 'product1',
  photo: true,
});

const defaultCart = [{ _id: 'item1', quantity: 3, product: defaultProduct }];

const setUp = (store, pushFn = jest.fn()) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search: '?p=1' },
    push: pushFn,
  };

  return render(
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <CartItemAdded />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

afterEach(cleanup);

describe('<CartItemAdded />', () => {
  describe('Check how renders', () => {
    it('should render everything correctly if isCartLoading is false', () => {
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
      const store = createStore([], defaultProduct, true);
      const { asFragment } = setUp(store);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('should render everything correctly if isCartLoading is false', () => {
    const store = createStore(defaultCart, defaultProduct);
    const pushFn = jest.fn();
    setUp(store, pushFn);

    fireEvent.click(screen.getByTestId('CartItemAdded-cart-link'));
    expect(pushFn).toHaveBeenCalledWith('/cart');
    expect(pushFn).toHaveBeenCalledTimes(1);
  });
});
