import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Transaction from './Transaction';
import theme from '../../styled/theme';
import {
  createTransactionAndOrderProdItem,
  defaultDeliveryAddress,
} from '../../shared/testUtility';

const mockStore = configureMockStore([thunk]);

const createHistory = (replace = jest.fn()) => ({
  listen: jest.fn(),
  createHref: jest.fn(),
  location: { pathname: '/transaction' },
  replace,
});

const defaultHistory = createHistory();

const setUp = (transaction, history = defaultHistory) => {
  const store = mockStore({
    auth: {
      transaction,
      deliveryAddress: defaultDeliveryAddress,
    },
  });

  return render(
    <Router history={history}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Transaction />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

window.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
}));

afterEach(cleanup);

describe('<Transaction />', () => {
  describe('Check how renders', () => {
    it('Should render everything correctly with two items from one user', () => {
      const transaction = [
        createTransactionAndOrderProdItem('p1', 'user1', 4, 10.6, 'product1'),
        createTransactionAndOrderProdItem('p2', 'user1', 6, 299.98, 'product2'),
      ];
      const { asFragment } = setUp(transaction);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render nothing if transaction is empty', () => {
      const { asFragment } = setUp([]);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render nothing if transaction is falsy', () => {
      const { asFragment } = setUp(undefined);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Check how history behaves', () => {
    it('Should call replace if transaction is falsy', () => {
      const replaceFn = jest.fn();
      const history = createHistory(replaceFn);
      setUp(undefined, history);

      expect(replaceFn).toHaveBeenCalledTimes(1);
      expect(replaceFn).toHaveBeenCalledWith('/cart');
    });

    it('Should call replace if transaction has length 0', () => {
      const replaceFn = jest.fn();
      const history = createHistory(replaceFn);
      setUp([], history);

      expect(replaceFn).toHaveBeenCalledTimes(1);
      expect(replaceFn).toHaveBeenCalledWith('/cart');
    });
  });
});
