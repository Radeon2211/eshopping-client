import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import theme from '../../styled/theme';
import Orders from './Orders';
import {
  checkProps,
  createOrder,
  createTransactionAndOrderProdItem,
} from '../../shared/testUtility/testUtility';
import { orderTypes } from '../../shared/constants';
import * as actions from '../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const defaultSearch = '?p=1';

const setUp = (orders, orderCount, type = orderTypes.PLACED_ORDERS) => {
  const store = mockStore({
    auth: { orderCount },
    ui: { isDataLoading: false },
  });
  store.dispatch = jest.fn();

  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/my-account/placed-orders', search: defaultSearch },
  };

  return {
    ...render(
      <Router history={history}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Orders orders={orders} type={type} />
          </ThemeProvider>
        </Provider>
      </Router>,
    ),
    store,
    history,
  };
};

jest.mock('../../store/actions/indexActions.js', () => ({
  fetchOrders: (queryParams, orderType) => ({
    queryParams,
    orderType,
  }),
}));

afterEach(cleanup);

describe('<Orders />', () => {
  describe('check prop types', () => {
    it('should NOT throw a warning', () => {
      const expectedProps = {
        orders: [createOrder()],
        type: orderTypes.PLACED_ORDERS,
      };
      expect(checkProps(Orders, expectedProps)).toBeUndefined();
    });

    it('should throw a warning', () => {
      expect(checkProps(Orders, {})).not.toBeNull();
    });
  });

  describe('check how renders', () => {
    it('should render only <Loader />', () => {
      setUp(undefined, undefined);
      expect(screen.getByTestId('Loader')).toBeInTheDocument();
    });

    it('should one order with one order givena and type PLACED_ORDERS', () => {
      const products = [
        createTransactionAndOrderProdItem({
          productId: 'p1',
          sellerUsername: 'sellerUser',
          price: 4,
          quantity: 4,
          name: 'product1',
          photo: true,
        }),
      ];
      const orders = [
        createOrder({
          products,
          id: 'o1',
          sellerUsername: 'sellerUser',
          buyerUsername: 'buyerUser',
          overallPrice: 16,
          createdAt: '2021-01-08T11:08:51.008Z',
        }),
      ];
      setUp(orders, 1, orderTypes.PLACED_ORDERS);
      expect(screen.getAllByTestId('OrderList-single-order')).toHaveLength(1);
    });

    it('should render two orders with two orders given and type SELL_HISTORY', () => {
      const products1 = [
        createTransactionAndOrderProdItem({
          productId: 'p1',
          sellerUsername: 'sellerUser',
          price: 4,
          quantity: 4,
          name: 'product1',
          photo: true,
        }),
      ];
      const products2 = [
        createTransactionAndOrderProdItem({
          productId: 'p2',
          sellerUsername: 'sellerUser',
          price: 6.4,
          quantity: 2,
          name: 'product2',
          photo: true,
        }),
      ];
      const orders = [
        createOrder({
          products: products1,
          id: 'o1',
          sellerUsername: 'sellerUser',
          buyerUsername: 'buyerUser',
          overallPrice: 16,
          createdAt: '2021-01-08T11:08:51.008Z',
        }),
        createOrder({
          products: products2,
          id: 'o2',
          sellerUsername: 'sellerUser',
          buyerUsername: 'buyerUser',
          overallPrice: 12.8,
          createdAt: '2021-02-18T21:12:35.008Z',
        }),
      ];
      setUp(orders, 2, orderTypes.SELL_HISTORY);
      expect(screen.getAllByTestId('OrderList-single-order')).toHaveLength(2);
    });

    it('should render correct info if orders are null and type PLACED_ORDERS', () => {
      setUp(null, undefined, orderTypes.PLACED_ORDERS);
      expect(screen.getByTestId('Orders-error')).toHaveTextContent(
        'There is a problem to fetch your placed orders',
      );
    });

    it('should render correct info if orders are empty array and type PLACED_ORDERS', () => {
      setUp([], undefined, orderTypes.PLACED_ORDERS);
      expect(screen.getByTestId('Orders-no-orders-info')).toHaveTextContent(
        "You don't have any placed orders yet",
      );
    });

    it('should render correct info if orders are null and type SELL_HISTORY', () => {
      setUp(null, undefined, orderTypes.SELL_HISTORY);
      expect(screen.getByTestId('Orders-error')).toHaveTextContent(
        'There is a problem to fetch your sell history',
      );
    });

    it('should render correct info if orders are empty array and type SELL_HISTORY', () => {
      setUp([], undefined, orderTypes.SELL_HISTORY);
      expect(screen.getByTestId('Orders-no-orders-info')).toHaveTextContent(
        'Your sell history is empty',
      );
    });
  });

  describe('check useEffect()', () => {
    it('should call fetchOrders() with default search and type PLACED_ORDERS', () => {
      const { store } = setUp([createOrder()], undefined, orderTypes.PLACED_ORDERS);
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.fetchOrders(defaultSearch, orderTypes.PLACED_ORDERS),
      );
    });

    it('should call fetchOrders() with default search and type SELL_HISTORY', () => {
      const { store } = setUp([createOrder()], undefined, orderTypes.SELL_HISTORY);
      expect(store.dispatch).toHaveBeenCalledWith(
        actions.fetchOrders(defaultSearch, orderTypes.SELL_HISTORY),
      );
    });
  });
});
