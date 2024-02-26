import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import OrderList from './OrderList';
import {
  createTransactionAndOrderProdItem,
  createOrder,
  renderAppPart,
  testRouterPushCall,
} from '../../../shared/testUtility/testUtility';
import { orderTypes } from '../../../shared/constants';

const mockStore = configureMockStore([thunk]);

const setUp = (orders, orderType, isDataLoading = false, pushFn = jest.fn()) => {
  const store = mockStore({
    ui: { isDataLoading },
  });

  return {
    ...renderAppPart(<OrderList orders={orders} orderType={orderType} />, {
      pathname: '/my-account/placed-orders',
      search: '?p=1',
      push: pushFn,
      store,
    }),
  };
};

describe('<OrderList />', () => {
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
      const pushFn = jest.fn();
      setUp(orders, orderTypes.PLACED_ORDERS, false, pushFn);

      fireEvent.click(screen.getByTestId('OrderList-user-link'));
      testRouterPushCall(pushFn, 0, '/user/sellerUser', '?p=1');

      fireEvent.click(screen.getByTestId('OrderList-order-details-link'));
      testRouterPushCall(pushFn, 1, '/order/o1');

      expect(pushFn).toHaveBeenCalledTimes(2);
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
      const pushFn = jest.fn();
      setUp(orders, orderTypes.SELL_HISTORY, false, pushFn);

      fireEvent.click(screen.getByTestId('OrderList-user-link'));
      testRouterPushCall(pushFn, 0, '/user/buyerUser', '?p=1');

      fireEvent.click(screen.getByTestId('OrderList-order-details-link'));
      testRouterPushCall(pushFn, 1, '/order/o1');

      expect(pushFn).toHaveBeenCalledTimes(2);
    });
  });
});
