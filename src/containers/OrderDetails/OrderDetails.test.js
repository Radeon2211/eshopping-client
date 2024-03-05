import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import OrderDetails from './OrderDetails';
import {
  createOrder,
  createTransactionAndOrderProdItem,
  defaultDeliveryAddress,
  renderAppPart,
  testRouterPushCall,
} from '../../shared/testUtility/testUtility';
import * as actions from '../../store/actions/indexActions';
import { defaultScrollToConfig } from '../../shared/constants';

const mockStore = configureMockStore([thunk]);

const defaultOrderId = 'o1';

const setUp = (orderDetails, pushFn = jest.fn()) => {
  const store = mockStore({
    auth: { orderDetails },
  });
  store.dispatch = jest.fn();

  return {
    ...renderAppPart(<OrderDetails />, {
      pathname: `/order/${defaultOrderId}`,
      push: pushFn,
      store,
    }),
    store,
  };
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: defaultOrderId,
  }),
}));

jest.mock('../../store/actions/indexActions.js', () => ({
  fetchOrderDetails: (orderId) => orderId,
  setOrderDetails: (orderDetails) => orderDetails,
}));

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('<OrderDetails />', () => {
  describe('check how renders', () => {
    it('should render only <Loader /> if orderDetails is undefined', () => {
      setUp(undefined);
      expect(screen.getByTestId('Loader')).toBeInTheDocument();
    });

    it('should render only info that there is a problem to fetch order details', () => {
      setUp(null);
      expect(screen.getByTestId('OrderDetails-error')).toBeInTheDocument();
    });

    it('should render everything correctly with two <TransactionAndOrderProdItem />', async () => {
      const products = [createTransactionAndOrderProdItem(), createTransactionAndOrderProdItem()];
      const orderDetails = createOrder({
        _id: 'o1',
        products,
        seller: {
          username: 'sellerUser',
          email: 'sellerEmail',
          phone: '123',
        },
        buyer: {
          username: 'buyerUser',
        },
      });

      setUp({
        ...orderDetails,
        deliveryAddress: defaultDeliveryAddress,
      });
      expect(screen.getByTestId('OrderDetails-seller-username')).toHaveTextContent(
        'Username: sellerUser',
      );
      await waitFor(() => {
        expect(document.title).toEqual('Order details - E-Shopping');
      });
    });

    it('should render that buyer and seller are deleted', () => {
      const products = [createTransactionAndOrderProdItem()];
      const orderDetails = createOrder({
        _id: 'o1',
        products,
      });

      setUp({
        ...orderDetails,
        deliveryAddress: defaultDeliveryAddress,
      });

      expect(screen.getByTestId('OrderDetails-buyer-deleted')).toBeInTheDocument();
      expect(screen.getByTestId('OrderDetails-seller-deleted')).toBeInTheDocument();
      expect(screen.queryByTestId('OrderDetails-buyer-link')).not.toBeInTheDocument();
      expect(screen.queryByTestId('OrderDetails-seller-info')).not.toBeInTheDocument();
    });

    it('should call push with correct paths after clicking on links', () => {
      const products = [createTransactionAndOrderProdItem()];
      const orderDetails = createOrder({
        _id: 'o1',
        products,
        seller: {
          username: 'sellerUser',
          email: 'sellerEmail',
          phone: '123',
        },
        buyer: {
          username: 'buyerUser',
        },
      });

      const pushFn = jest.fn();
      setUp(
        {
          ...orderDetails,
          deliveryAddress: defaultDeliveryAddress,
        },
        pushFn,
      );

      fireEvent.click(screen.getByTestId('OrderDetails-buyer-link'));
      testRouterPushCall(pushFn, 0, '/user/buyerUser', '?p=1');

      fireEvent.click(screen.getByTestId('OrderDetails-seller-link'));
      testRouterPushCall(pushFn, 1, '/user/sellerUser', '?p=1');

      expect(pushFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('check useEffect()', () => {
    it('should call fetchOrderDetails() after mounting', () => {
      const { store } = setUp();
      expect(store.dispatch).toHaveBeenCalledWith(actions.fetchOrderDetails(defaultOrderId));
    });

    it('should call setOrderDetails() after unmounting', () => {
      const { store, unmount } = setUp();
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      unmount();
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.setOrderDetails());
      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('should call scrollTo() after mounting', () => {
      setUp();
      expect(window.scrollTo).toHaveBeenCalledWith(defaultScrollToConfig);
    });
  });
});
