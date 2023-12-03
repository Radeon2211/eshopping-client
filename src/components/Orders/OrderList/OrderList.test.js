import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import OrderList from './OrderList';
import theme from '../../../styled/theme';
import {
  checkProps,
  createTransactionAndOrderProdItem,
  createOrder,
} from '../../../shared/testUtility/testUtility';
import { orderTypes } from '../../../shared/constants';

const mockStore = configureMockStore([thunk]);

const setUp = (orders, orderType, isDataLoading = false) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/my-account/placed-orders', search: '?p=1' },
    push: jest.fn(),
  };

  const store = mockStore({
    ui: { isDataLoading },
  });

  return {
    ...render(
      <Router history={history}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <OrderList orders={orders} orderType={orderType} />
          </ThemeProvider>
        </Provider>
      </Router>,
    ),
    history,
  };
};

afterEach(cleanup);

describe('<OrderList />', () => {
  describe('check prop types', () => {
    it('should NOT throw a warning', () => {
      const props = {
        orders: [createOrder()],
        orderType: orderTypes.PLACED_ORDERS,
      };
      expect(checkProps(OrderList, props)).toBeUndefined();
    });

    it('should throw a warning', () => {
      expect(checkProps(OrderList, {})).not.toBe(null);
    });
  });

  describe('check how renders', () => {
    it('should render everything correctly with two items and type PLACED_ORDERS', () => {
      const products = [
        createTransactionAndOrderProdItem({
          productId: 'p1',
          sellerUsername: 'sellerUser',
          price: 4,
          quantity: 4,
          name: 'product1',
          photo: true,
        }),
        createTransactionAndOrderProdItem({
          productId: 'p2',
          sellerUsername: 'sellerUser',
          price: 6.4,
          quantity: 2,
          name: 'product2',
        }),
      ];
      const orders = [
        createOrder({
          products,
          id: 'o1',
          sellerUsername: 'sellerUser',
          buyerUsername: 'buyerUser',
          overallPrice: 28.8,
          createdAt: '2021-01-08T11:08:51.008Z',
        }),
      ];
      setUp(orders, orderTypes.PLACED_ORDERS);
      expect(screen.getByTestId('OrderList-user-type')).toHaveTextContent('seller');
      expect(screen.getByTestId('OrderList-user-link')).toHaveTextContent('sellerUser');
      expect(screen.getByTestId('OrderList-created-at-date')).toHaveTextContent(
        '8 Jan 2021, 12:08',
      );
      expect(screen.getByTestId('OrderList-overall-price')).toHaveTextContent('$28.80');
    });

    it('should render everything correctly with one item and type SELL_HISTORY', () => {
      const products = [
        createTransactionAndOrderProdItem({
          productId: 'p1',
          sellerUsername: 'sellerUser',
          price: 6.4,
          quantity: 2,
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
          overallPrice: 12.8,
          createdAt: '2021-02-17T01:53:45.008Z',
        }),
      ];
      setUp(orders, orderTypes.SELL_HISTORY);
      expect(screen.getByTestId('OrderList-user-type')).toHaveTextContent('buyer');
      expect(screen.getByTestId('OrderList-user-link')).toHaveTextContent('buyerUser');
      expect(screen.getByTestId('OrderList-created-at-date')).toHaveTextContent(
        '17 Feb 2021, 02:53',
      );
      expect(screen.getByTestId('OrderList-overall-price')).toHaveTextContent('$12.80');
    });

    it('should render account deleted - type PLACED_ORDERS', () => {
      const products = [
        createTransactionAndOrderProdItem({
          productId: 'p1',
          sellerUsername: null,
          price: 6.4,
          quantity: 4,
          name: 'product1',
          photo: true,
        }),
      ];
      const orders = [
        createOrder({
          products,
          id: 'o1',
          sellerUsername: null,
          buyerUsername: 'buyerUser',
          overallPrice: 12.8,
          createdAt: '2021-02-28T21:13:05.008Z',
        }),
      ];
      setUp(orders, orderTypes.PLACED_ORDERS);

      expect(screen.getByTestId('OrderList-account-deleted')).toBeInTheDocument();
      expect(screen.queryByTestId('OrderList-user-link')).not.toBeInTheDocument();
    });

    it('should render account deleted - type SELL_HISTORY', () => {
      const products = [
        createTransactionAndOrderProdItem({
          productId: 'p1',
          sellerUsername: 'sellerUser',
          price: 6.4,
          quantity: 2,
          name: 'product1',
          photo: true,
        }),
      ];
      const orders = [
        createOrder({
          products,
          id: 'o1',
          sellerUsername: 'sellerUser',
          buyerUsername: null,
          overallPrice: 12.8,
          createdAt: '2021-02-28T21:13:05.008Z',
        }),
      ];
      setUp(orders, orderTypes.SELL_HISTORY);

      expect(screen.getByTestId('OrderList-account-deleted')).toBeInTheDocument();
      expect(screen.queryByTestId('OrderList-user-link')).not.toBeInTheDocument();
    });

    it('should render <LoadingOverlay />', () => {
      const products = [
        createTransactionAndOrderProdItem({
          productId: 'p1',
          sellerUsername: 'sellerUser',
          price: 6.4,
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
          overallPrice: 12.8,
          createdAt: '2021-02-28T21:13:05.008Z',
        }),
      ];
      setUp(orders, orderTypes.PLACED_ORDERS, true);

      expect(screen.getByTestId('LoadingOverlay')).toBeInTheDocument();
    });
  });

  describe('check behaviour after clicking links', () => {
    it('should call push with correct path after clicking links - type PLACED_ORDERS', () => {
      const products = [createTransactionAndOrderProdItem()];
      const orders = [
        createOrder({
          products,
          id: 'o1',
          sellerUsername: 'sellerUser',
          buyerUsername: 'buyerUser',
        }),
      ];
      const { history } = setUp(orders, orderTypes.PLACED_ORDERS, false);

      fireEvent.click(screen.getByTestId('OrderList-user-link'));
      expect(history.push).toHaveBeenNthCalledWith(1, '/user/sellerUser?p=1');

      fireEvent.click(screen.getByTestId('OrderList-order-details-link'));
      expect(history.push).toHaveBeenNthCalledWith(2, '/order/o1');

      expect(history.push).toHaveBeenCalledTimes(2);
    });

    it('should call push with correct path after clicking links - type SELL_HISTORY', () => {
      const products = [createTransactionAndOrderProdItem()];
      const orders = [
        createOrder({
          products,
          id: 'o1',
          sellerUsername: 'sellerUser',
          buyerUsername: 'buyerUser',
        }),
      ];
      const { history } = setUp(orders, orderTypes.SELL_HISTORY, false);

      fireEvent.click(screen.getByTestId('OrderList-user-link'));
      expect(history.push).toHaveBeenNthCalledWith(1, '/user/buyerUser?p=1');

      fireEvent.click(screen.getByTestId('OrderList-order-details-link'));
      expect(history.push).toHaveBeenNthCalledWith(2, '/order/o1');

      expect(history.push).toHaveBeenCalledTimes(2);
    });
  });
});
