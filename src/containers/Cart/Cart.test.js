import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import Cart from './Cart';
import theme from '../../styled/theme';
import { createCartItem } from '../../shared/testUtility/testUtility';
import { DEFAULT_PATH } from '../../shared/constants';

const mockStore = configureMockStore([thunk]);

const setUp = (cart, isCartLoading = false, pushFn = jest.fn()) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/cart' },
    push: pushFn,
  };

  const store = mockStore({
    auth: { cart },
    ui: { isCartLoading },
  });

  return render(
    <Router history={history}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Cart />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

afterEach(cleanup);

describe('<Cart />', () => {
  it('should render everything correctly with one cart item', () => {
    const { asFragment } = setUp([
      createCartItem({
        sellerUsername: 'user1',
        quantity: 5,
        productId: 'p1',
        price: 499.97,
      }),
    ]);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render empty cart', () => {
    const { asFragment } = setUp([]);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render only <Loader />', () => {
    const { asFragment } = setUp(undefined, true);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render that there is a problem to fetch cart', () => {
    const { asFragment } = setUp(null);
    expect(asFragment()).toMatchSnapshot();
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
    expect(screen.getByText('go to summary')).toBeDisabled();
  });

  it('should trigger push with DEFAULT_PATH after click on link in empty cart', () => {
    const pushFn = jest.fn();
    setUp([], false, pushFn);
    fireEvent.click(screen.getByTestId('Cart-default-path-link'));
    expect(pushFn).toHaveBeenCalledTimes(1);
    expect(pushFn).toHaveBeenCalledWith(DEFAULT_PATH);
  });
});
