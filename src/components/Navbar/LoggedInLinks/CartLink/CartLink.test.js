import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import CartLink from './CartLink';
import theme from '../../../../styled/theme';

const mockStore = configureMockStore([thunk]);

const setUp = (cart, pushFn = jest.fn()) => {
  const store = mockStore({
    auth: { cart },
  });

  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search: '?p=1' },
    push: pushFn,
  };

  return render(
    <Router history={history}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CartLink />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

afterEach(cleanup);

describe('<CartLink />', () => {
  it('should render everything correctly with quantity 1', () => {
    const { asFragment } = setUp([{ _id: '1' }]);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should NOT render quantity if cart length is 0', () => {
    const { asFragment } = setUp([]);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should NOT render quantity if cart is null', () => {
    const { asFragment } = setUp(null);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render quantity 3', () => {
    setUp([{ _id: '1' }, { _id: '2' }, { _id: '3' }]);
    expect(screen.getByTestId('CartLink-quantity').textContent).toEqual('3');
  });

  it('should call push after clicking cart link', () => {
    const pushFn = jest.fn();
    setUp([], pushFn);

    fireEvent.click(screen.getByTestId('CartLink'));
    expect(pushFn).toHaveBeenCalledWith('/cart');
    expect(pushFn).toHaveBeenCalledTimes(1);
  });
});
