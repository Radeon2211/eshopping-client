import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import CartLink from './CartLink';
import theme from '../../../../styled/theme';

const mockStore = configureMockStore([thunk]);

const setUp = (cart) => {
  const store = mockStore({
    auth: { cart },
  });

  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search: '?p=1' },
    push: jest.fn(),
  };

  return {
    ...render(
      <Router history={history}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CartLink />
          </ThemeProvider>
        </Provider>
      </Router>,
    ),
    history,
  };
};

afterEach(cleanup);

describe('<CartLink />', () => {
  it('should render everything correctly with quantity 1', () => {
    setUp([{ _id: '1' }]);
    expect(screen.getByTestId('CartLink-quantity')).toHaveTextContent('1');
  });

  it('should NOT render quantity if cart length is 0', () => {
    setUp([]);
    expect(screen.queryByTestId('CartLink-quantity')).not.toBeInTheDocument();
  });

  it('should NOT render quantity if cart is null', () => {
    setUp(null);
    expect(screen.queryByTestId('CartLink-quantity')).not.toBeInTheDocument();
  });

  it('should render quantity 3', () => {
    setUp([{ _id: '1' }, { _id: '2' }, { _id: '3' }]);
    expect(screen.getByTestId('CartLink-quantity')).toHaveTextContent('3');
  });

  it('should call push after clicking cart link', () => {
    const { history } = setUp([]);
    fireEvent.click(screen.getByTestId('CartLink'));
    expect(history.push).toHaveBeenCalledWith('/cart');
  });
});
