import React from 'react';
import { render, cleanup } from '@testing-library/react';
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

const mockStore = configureMockStore([thunk]);

const defaultHistory = {
  listen: jest.fn(),
  createHref: jest.fn(),
  location: { pathname: '/my-account/placed-orders', search: '?p=1' },
};

const setUp = (orders, orderCount, type = orderTypes.PLACED_ORDERS) => {
  const store = mockStore({
    auth: { orderCount },
    ui: { isDataLoading: false },
  });

  return render(
    <Router history={defaultHistory}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Orders orders={orders} type={type} />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

afterEach(cleanup);

describe('<Orders />', () => {
  describe('Check prop types', () => {
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

  describe('Check how renders', () => {
    it('should render only <Loader />', () => {
      const { asFragment } = setUp(undefined, undefined);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should everything correctly with one order and type PLACED_ORDERS', () => {
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
      const { asFragment } = setUp(orders, 1, orderTypes.PLACED_ORDERS);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should everything correctly with two orders and type SELL_HISTORY', () => {
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
      const { asFragment } = setUp(orders, 2, orderTypes.SELL_HISTORY);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correct info if orders are null and type PLACED_ORDERS', () => {
      const { asFragment } = setUp(null, undefined, orderTypes.PLACED_ORDERS);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correct info if orders are empty array and type PLACED_ORDERS', () => {
      const { asFragment } = setUp([], undefined, orderTypes.PLACED_ORDERS);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correct info if orders are null and type SELL_HISTORY', () => {
      const { asFragment } = setUp(null, undefined, orderTypes.SELL_HISTORY);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render correct info if orders are empty array and type SELL_HISTORY', () => {
      const { asFragment } = setUp([], undefined, orderTypes.SELL_HISTORY);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
