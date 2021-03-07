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
} from '../../../shared/testUtility';
import { orderTypes } from '../../../shared/constants';

const mockStore = configureMockStore([thunk]);

const setUp = (orders, orderType, isDataLoading = false, pushFn) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/my-account/placed-orders', search: '?p=1' },
    push: pushFn,
  };

  const store = mockStore({
    ui: { isDataLoading },
  });

  return render(
    <Router history={history}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <OrderList orders={orders} orderType={orderType} />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

afterEach(cleanup);

describe('<OrderList />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const props = {
        orders: [createOrder()],
        orderType: orderTypes.PLACED_ORDERS,
      };
      expect(checkProps(OrderList, props)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(OrderList, {})).not.toBe(null);
    });
  });

  describe('Check how renders', () => {
    it('Should render everything correctly with two items and type PLACED_ORDERS', () => {
      const products = [
        createTransactionAndOrderProdItem('p1', 'sellerUser', 4, 4, 'product1', true),
        createTransactionAndOrderProdItem('p2', 'sellerUser', 2, 6.4, 'product2'),
      ];
      const orders = [
        createOrder(products, 'o1', 'sellerUser', 'buyerUser', 28.8, '2021-01-08T11:08:51.008Z'),
      ];
      const { asFragment } = setUp(orders, orderTypes.PLACED_ORDERS);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render everything correctly with one item and type SELL_HISTORY', () => {
      const products = [
        createTransactionAndOrderProdItem('p1', 'sellerUser', 2, 6.4, 'product1', true),
      ];
      const orders = [
        createOrder(products, 'o1', 'sellerUser', 'buyerUser', 12.8, '2021-02-17T01:53:45.008Z'),
      ];
      const { asFragment } = setUp(orders, orderTypes.SELL_HISTORY);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render account deleted - type PLACED_ORDERS', () => {
      const products = [createTransactionAndOrderProdItem('p1', null, 2, 6.4, 'product1', true)];
      const orders = [
        createOrder(products, 'o1', null, 'buyerUser', 12.8, '2021-02-28T21:13:05.008Z'),
      ];
      setUp(orders, orderTypes.PLACED_ORDERS);

      expect(screen.getByTestId('OrderList-account-deleted')).toBeInTheDocument();
      expect(screen.queryByTestId('OrderList-user-link')).not.toBeInTheDocument();
    });

    it('Should render account deleted - type SELL_HISTORY', () => {
      const products = [
        createTransactionAndOrderProdItem('p1', 'sellerUser', 2, 6.4, 'product1', true),
      ];
      const orders = [
        createOrder(products, 'o1', 'sellerUser', null, 12.8, '2021-02-28T21:13:05.008Z'),
      ];
      setUp(orders, orderTypes.SELL_HISTORY);

      expect(screen.getByTestId('OrderList-account-deleted')).toBeInTheDocument();
      expect(screen.queryByTestId('OrderList-user-link')).not.toBeInTheDocument();
    });

    it('Should render <LoadingOverlay />', () => {
      const products = [
        createTransactionAndOrderProdItem('p1', 'sellerUser', 2, 6.4, 'product1', true),
      ];
      const orders = [
        createOrder(products, 'o1', 'sellerUser', 'buyerUser', 12.8, '2021-02-28T21:13:05.008Z'),
      ];
      setUp(orders, orderTypes.PLACED_ORDERS, true);

      expect(screen.getByTestId('LoadingOverlay')).toBeInTheDocument();
    });
  });

  describe('Check behaviour after clicking links', () => {
    it('Should call push with correct path after clicking links - type PLACED_ORDERS', () => {
      const products = [createTransactionAndOrderProdItem()];
      const orders = [createOrder(products, 'o1', 'sellerUser', 'buyerUser')];
      const pushFn = jest.fn();
      setUp(orders, orderTypes.PLACED_ORDERS, false, pushFn);

      fireEvent.click(screen.getByTestId('OrderList-user-link'));
      expect(pushFn).toHaveBeenCalledWith('/user/sellerUser?p=1');

      fireEvent.click(screen.getByTestId('OrderList-order-details-link'));
      expect(pushFn).toHaveBeenLastCalledWith('/order/o1');

      expect(pushFn).toHaveBeenCalledTimes(2);
    });

    it('Should call push with correct path after clicking links - type SELL_HISTORY', () => {
      const products = [createTransactionAndOrderProdItem()];
      const orders = [createOrder(products, 'o1', 'sellerUser', 'buyerUser')];
      const pushFn = jest.fn();
      setUp(orders, orderTypes.SELL_HISTORY, false, pushFn);

      fireEvent.click(screen.getByTestId('OrderList-user-link'));
      expect(pushFn).toHaveBeenCalledWith('/user/buyerUser?p=1');

      fireEvent.click(screen.getByTestId('OrderList-order-details-link'));
      expect(pushFn).toHaveBeenLastCalledWith('/order/o1');

      expect(pushFn).toHaveBeenCalledTimes(2);
    });
  });
});
