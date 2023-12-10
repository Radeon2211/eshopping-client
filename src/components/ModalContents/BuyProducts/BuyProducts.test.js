import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BuyProducts from './BuyProducts';
import theme from '../../../styled/theme';
import * as actions from '../../../store/actions/indexActions';
import useLastLocation from '../../../shared/useLastLocation';

const mockStore = configureMockStore([thunk]);

const setUp = () => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/transaction' },
  };

  const store = mockStore({});
  store.dispatch = jest.fn();

  return {
    ...render(
      <Router history={history}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <BuyProducts />
          </ThemeProvider>
        </Provider>
      </Router>,
    ),
    store,
    history,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  buyProducts: (history, lastPath) => ({
    history,
    lastPath,
  }),
}));

jest.mock('../../../shared/useLastLocation', () => ({
  __esModule: true,
  default: jest.fn(),
}));

afterEach(cleanup);

describe('<BuyProducts />', () => {
  describe('checks behaviour after buttons clicks', () => {
    it('should call setModal() and buyProducts() after buttons clicks', () => {
      useLastLocation.mockImplementation(() => ({
        pathname: '/cart',
      }));

      const { store, history } = setUp();
      expect(store.dispatch).not.toHaveBeenCalled();

      fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.setModal(''));

      fireEvent.click(screen.getByRole('button', { name: /confirm/i }));
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.buyProducts(history, '/cart'));

      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
