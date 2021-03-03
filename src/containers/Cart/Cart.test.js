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
import { createCartItem } from '../../shared/testUtility';
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

window.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
}));

afterEach(cleanup);

describe('<Cart />', () => {
  it('Should render everything correctly with one cart item', () => {
    const { asFragment } = setUp([createCartItem('user1', 5, 'p1', 499.97)]);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render empty cart', () => {
    const { asFragment } = setUp([]);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render only <Loader />', () => {
    const { asFragment } = setUp(undefined, true);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render that there is a problem to fetch cart', () => {
    const { asFragment } = setUp(null);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render <LoadingOverlay /> and go to summary button should be disabled', () => {
    setUp([createCartItem('user1', 5, 'p1', 499.97)], true);
    expect(screen.getByTestId('loading-overlay')).toBeInTheDocument();
    expect(screen.getByText('go to summary')).toBeDisabled();
  });

  it('Should trigger push with DEFAULT_PATH after click on link in empty cart', () => {
    const pushFn = jest.fn();
    setUp([], false, pushFn);
    fireEvent.click(screen.getByTestId('default-path-link'));
    expect(pushFn).toHaveBeenCalledTimes(1);
    expect(pushFn).toHaveBeenCalledWith(DEFAULT_PATH);
  });
});
