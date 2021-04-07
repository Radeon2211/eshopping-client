import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import OrderDetails from './OrderDetails';
import {
  createOrder,
  createTransactionAndOrderProdItem,
  defaultDeliveryAddress,
} from '../../shared/testUtility/testUtility';
import theme from '../../styled/theme';
import * as actions from '../../store/actions/indexActions';
import { defaultScrollToConfig } from '../../shared/constants';

const mockStore = configureMockStore([thunk]);

const defaultOrderId = 'o1';

const setUp = (orderDetails) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: `/order/${defaultOrderId}` },
    push: jest.fn(),
  };

  const store = mockStore({
    auth: { orderDetails },
  });
  store.dispatch = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <ThemeProvider theme={theme}>
            <OrderDetails />
          </ThemeProvider>
        </Router>
      </Provider>,
    ),
    store,
    history,
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

afterEach(cleanup);

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('<OrderDetails />', () => {
  describe('check how renders', () => {
    it('should render only <Loader /> if orderDetails is undefined', () => {
      const { asFragment } = setUp(undefined);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render only info that there is a problem to fetch order details', () => {
      const { asFragment } = setUp(null);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render everything correctly with two <TransactionAndOrderProdItem />', () => {
      const products = [createTransactionAndOrderProdItem(), createTransactionAndOrderProdItem()];
      const orderDetails = createOrder({
        products,
        id: 'o1',
        sellerUsername: 'sellerUser',
        buyerUsername: 'buyerUser',
        overallPrice: 111.1,
        createdAt: '2021-01-11T12:32:51.008Z',
        sellerEmail: 'sellerEmail',
        sellerPhone: '123',
      });

      const { asFragment } = setUp({
        ...orderDetails,
        deliveryAddress: defaultDeliveryAddress,
      });
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render that buyer and seller are deleted', () => {
      const products = [createTransactionAndOrderProdItem()];
      const orderDetails = createOrder({
        products,
        id: 'o1',
        sellerUsername: null,
        buyerUsername: null,
        overallPrice: 111.1,
        createdAt: '2021-01-11T12:32:51.008Z',
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
        products,
        id: 'o1',
        sellerUsername: 'sellerUser',
        buyerUsername: 'buyerUser',
        overallPrice: 111.1,
        createdAt: '2021-01-11T12:32:51.008Z',
        sellerEmail: 'sellerEmail',
        sellerPhone: '123',
      });

      const { history } = setUp({
        ...orderDetails,
        deliveryAddress: defaultDeliveryAddress,
      });

      fireEvent.click(screen.getByTestId('OrderDetails-buyer-link'));
      expect(history.push).toHaveBeenCalledWith('/user/buyerUser?p=1');

      fireEvent.click(screen.getByTestId('OrderDetails-seller-link'));
      expect(history.push).toHaveBeenLastCalledWith('/user/sellerUser?p=1');

      expect(history.push).toHaveBeenCalledTimes(2);
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
