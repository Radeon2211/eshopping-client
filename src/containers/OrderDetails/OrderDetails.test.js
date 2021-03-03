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
  checkProps,
  createOrder,
  createTransactionAndOrderProdItem,
  defaultDeliveryAddress,
} from '../../shared/testUtility';
import theme from '../../styled/theme';

const mockStore = configureMockStore([thunk]);

const defaultProps = {
  match: {
    params: { id: 'o1' },
  },
};

const setUp = (orderDetails, pushFn = jest.fn()) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/order/o1' },
    push: pushFn,
  };

  const store = mockStore({
    auth: { orderDetails },
  });

  return render(
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <OrderDetails {...defaultProps} />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

beforeEach(cleanup);

describe('<OrderDetails />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(OrderDetails, defaultProps)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(OrderDetails, {})).not.toBe(null);
    });
  });

  describe('Check how renders', () => {
    it('Should render only <Loader /> if orderDetails is undefined', () => {
      const { asFragment } = setUp(undefined);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render only info that there is a problem to fetch order details', () => {
      const { asFragment } = setUp(null);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render everything correctly with two <TransactionAndOrderProdItem />', () => {
      const products = [createTransactionAndOrderProdItem(), createTransactionAndOrderProdItem()];
      const orderDetails = createOrder(
        products,
        'o1',
        'sellerUser',
        'buyerUser',
        111.1,
        '2021-01-11T12:32:51.008Z',
        'sellerEmail',
        '123',
      );

      const { asFragment } = setUp({
        ...orderDetails,
        deliveryAddress: defaultDeliveryAddress,
      });
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render that buyer and seller are deleted', () => {
      const products = [createTransactionAndOrderProdItem()];
      const orderDetails = createOrder(
        products,
        'o1',
        null,
        null,
        111.1,
        '2021-01-11T12:32:51.008Z',
      );

      setUp({
        ...orderDetails,
        deliveryAddress: defaultDeliveryAddress,
      });

      expect(screen.getByTestId('order-details-buyer-deleted')).toBeInTheDocument();
      expect(screen.getByTestId('order-details-seller-deleted')).toBeInTheDocument();
      expect(screen.queryByTestId('order-details-buyer-link')).not.toBeInTheDocument();
      expect(screen.queryByTestId('order-details-seller-info')).not.toBeInTheDocument();
    });

    it('Should call push with correct paths after clicking on links', () => {
      const products = [createTransactionAndOrderProdItem()];
      const orderDetails = createOrder(
        products,
        'o1',
        'sellerUser',
        'buyerUser',
        111.1,
        '2021-01-11T12:32:51.008Z',
        'sellerEmail',
        '123',
      );

      const pushFn = jest.fn();

      setUp(
        {
          ...orderDetails,
          deliveryAddress: defaultDeliveryAddress,
        },
        pushFn,
      );

      fireEvent.click(screen.getByTestId('order-details-buyer-link'));
      expect(pushFn).toHaveBeenCalledWith('/user/buyerUser?p=1');
      fireEvent.click(screen.getByTestId('order-details-seller-link'));
      expect(pushFn).toHaveBeenLastCalledWith('/user/sellerUser?p=1');
      expect(pushFn).toHaveBeenCalledTimes(2);
    });
  });
});
