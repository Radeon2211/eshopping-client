import React from 'react';
import { render, cleanup, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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
import { defaultScrollToConfig } from '../../shared/constants';

const mockStore = configureMockStore([thunk]);

const setUp = (transaction) => {
  const store = mockStore({
    auth: {
      transaction,
      deliveryAddress: defaultDeliveryAddress,
    },
  });
  store.dispatch = jest.fn();

  const history = {
    listen: () => () => {},
    createHref: jest.fn(),
    location: { pathname: '/transaction' },
    replace: jest.fn(),
  };

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
    history,
  };
};

afterEach(cleanup);

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('<Transaction />', () => {
  describe('check how renders', () => {
    it('should render everything correctly with two items from one user', async () => {
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
      setUp(transaction);
      expect(screen.getByTestId('Transaction-content')).toBeInTheDocument();
      expect(screen.getAllByTestId('CartAndTransactionItems-item')).toHaveLength(1);
      expect(screen.getAllByTestId('TransactionAndOrderProdItem')).toHaveLength(2);
      await waitFor(() => {
        expect(document.title).toEqual('Transaction summary - E-Shopping');
      });
    });

    it('should render nothing if transaction is empty', () => {
      setUp([]);
      expect(screen.queryByTestId('Transaction-content')).not.toBeInTheDocument();
    });

    it('should render nothing if transaction is falsy', () => {
      setUp(undefined);
      expect(screen.queryByTestId('Transaction-content')).not.toBeInTheDocument();
    });
  });

  describe('check useEffect()', () => {
    it('should call replace if transaction is falsy and call scrollTo()', () => {
      const { history } = setUp(undefined);
      expect(history.replace).toHaveBeenCalledWith('/cart');
      expect(window.scrollTo).toHaveBeenCalledWith(defaultScrollToConfig);
    });

    it('should call replace if transaction length is 0 and call scrollTo()', () => {
      const { history } = setUp([]);
      expect(history.replace).toHaveBeenCalledWith('/cart');
      expect(window.scrollTo).toHaveBeenCalledWith(defaultScrollToConfig);
    });

    it('should NOT call replace if transaction length is more than 1 and call scrollTo()', () => {
      const { history } = setUp([createTransactionAndOrderProdItem()]);
      expect(history.replace).not.toHaveBeenCalled();
      expect(window.scrollTo).toHaveBeenCalledWith(defaultScrollToConfig);
    });
  });
});
