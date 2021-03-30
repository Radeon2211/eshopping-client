import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import theme from '../../../styled/theme';
import MyPlacedOrders from './MyPlacedOrders';
import {
  createOrder,
  createTransactionAndOrderProdItem,
} from '../../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);

const products = [
  createTransactionAndOrderProdItem({
    productId: 'p1',
    sellerUsername: 'sellerUser',
    price: 80.2,
    quantity: 4,
    name: 'product1',
    photo: true,
  }),
];

const defaultStore = mockStore({
  auth: {
    placedOrders: [
      createOrder({
        products,
        id: 'o1',
        sellerUsername: 'sellerUser',
        buyerUsername: 'buyerUser',
        overallPrice: 320.8,
        createdAt: '2021-02-28T21:13:05.008Z',
      }),
    ],
    orderCount: 1,
  },
  ui: {
    isDataLoading: false,
  },
});

const defaultHistory = {
  listen: jest.fn(),
  createHref: jest.fn(),
  location: { pathname: '/my-account/placed-orders', search: '?p=1' },
  replace: jest.fn(),
};

const setUp = () => {
  return render(
    <Provider store={defaultStore}>
      <Router history={defaultHistory}>
        <ThemeProvider theme={theme}>
          <MyPlacedOrders />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

afterEach(cleanup);

describe('<MyPlacedOrders />', () => {
  it('should render everything correctly with given default data', () => {
    const { asFragment } = setUp();
    expect(asFragment()).toMatchSnapshot();
  });
});
