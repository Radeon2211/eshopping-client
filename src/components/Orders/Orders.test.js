import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Orders from './Orders';
import {
  createOrder,
  createTransactionAndOrderProdItem,
  renderAppPart,
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

  return {
    ...renderAppPart(<Orders orders={orders} type={type} />, {
      pathname: '/my-account/placed-orders',
      search: defaultSearch,
      store,
    }),
    store,
  };
};

jest.mock('../../store/actions/indexActions.js', () => ({
  fetchOrders: (queryParams, orderType) => ({
    queryParams,
    orderType,
  }),
}));

describe('<Orders />', () => {
  describe('check how renders', () => {
    it('should render only <Loader />', () => {
      setUp(undefined, undefined);
      expect(screen.getByTestId('Loader')).toBeInTheDocument();
    });

    it('should one order with one order givena and type PLACED_ORDERS', () => {
      const products = [
        createTransactionAndOrderProdItem({
          _id: 'p1',
          price: 4,
          quantity: 4,
          name: 'product1',
          photo: true,
          seller: {
            username: 'sellerUser',
          },
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
          _id: 'p1',
          price: 4,
          quantity: 4,
          name: 'product1',
          photo: true,
          seller: {
            username: 'sellerUser',
          },
        }),
      ];
      const products2 = [
        createTransactionAndOrderProdItem({
          _id: 'p2',
          price: 6.4,
          quantity: 2,
          name: 'product2',
          photo: true,
          seller: {
            username: 'sellerUser',
          },
        }),
      ];
      const orders = [
        createOrder({
          _id: 'o1',
          products: products1,
          seller: {
            username: 'sellerUser',
          },
          buyer: {
            username: 'buyerUser',
          },
          overallPrice: 16,
        }),
        createOrder({
          products: products2,
          id: 'o2',
          seller: {
            username: 'sellerUser',
          },
          buyer: {
            username: 'buyerUser',
          },
          overallPrice: 12.8,
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
