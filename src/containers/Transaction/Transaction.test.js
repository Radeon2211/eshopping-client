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
} from '../../shared/testUtility/testUtility';
import * as actions from '../../store/actions/indexActions';

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
  store.dispatch = jest.fn();

  return {
    ...render(
      <Router history={history}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Transaction />
          </ThemeProvider>
        </Provider>
      </Router>,
    ),
    store,
  };
};

afterEach(cleanup);

describe('<Transaction />', () => {
  describe('Check how renders', () => {
    it('should render everything correctly with two items from one user', () => {
      const transaction = [
        createTransactionAndOrderProdItem({
          productId: 'p1',
          sellerUsername: 'user1',
          price: 10.6,
          quantity: 4,
          name: 'product1',
          photo: false,
        }),
        createTransactionAndOrderProdItem({
          productId: 'p2',
          sellerUsername: 'user1',
          price: 299.98,
          quantity: 6,
          name: 'product2',
          photo: false,
        }),
      ];
      const { asFragment } = setUp(transaction);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render nothing if transaction is empty', () => {
      const { asFragment } = setUp([]);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render nothing if transaction is falsy', () => {
      const { asFragment } = setUp(undefined);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Check useEffect()', () => {
    it('should call replace if transaction is falsy', () => {
      const replaceFn = jest.fn();
      const history = createHistory(replaceFn);
      setUp(undefined, history);

      expect(replaceFn).toHaveBeenCalledTimes(1);
      expect(replaceFn).toHaveBeenCalledWith('/cart');
    });

    it('should call replace if transaction length is 0', () => {
      const replaceFn = jest.fn();
      const history = createHistory(replaceFn);
      setUp([], history);

      expect(replaceFn).toHaveBeenCalledTimes(1);
      expect(replaceFn).toHaveBeenCalledWith('/cart');
    });

    it('should call setTransaction() when unmounting', () => {
      const { store, unmount } = setUp();
      expect(store.dispatch).not.toHaveBeenCalled();
      unmount();
      expect(store.dispatch).toHaveBeenCalledWith(actions.setTransaction(undefined));
    });
  });
});
