import React from 'react';
import { render, cleanup, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import theme from '../../../styled/theme';
import MySellHistory from './MySellHistory';
import {
  createOrder,
  createTransactionAndOrderProdItem,
} from '../../../shared/testUtility/testUtility';
import { defaultScrollToConfig } from '../../../shared/constants';

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
    sellHistory: [
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
  location: { pathname: '/my-account/sell-history', search: '?p=1' },
  replace: jest.fn(),
};

const setUp = () => {
  return render(
    <Provider store={defaultStore}>
      <Router history={defaultHistory}>
        <ThemeProvider theme={theme}>
          <MySellHistory />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

jest.mock('react-router-last-location', () => ({
  useLastLocation: jest.fn(),
}));

afterEach(cleanup);

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('<MySellHistory />', () => {
  describe('check how renders', () => {
    it('should render everything correctly with given default data', async () => {
      setUp();
      expect(screen.getAllByTestId('OrderList-single-order')).toHaveLength(1);
      await waitFor(() => {
        expect(document.title).toEqual('Your sell history - E-Shopping');
      });
    });
  });

  describe('check useEffect()', () => {
    it('should call scrollTo() if last rendered route was OrderDetails', () => {
      useLastLocation.mockImplementation(() => ({
        pathname: '/order/o1',
      }));
      setUp();
      expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it('should NOT call scrollTo() if last rendered route was NOT OrderDetails', () => {
      useLastLocation.mockImplementation(() => ({
        pathname: '/cart',
      }));
      setUp();
      expect(window.scrollTo).toHaveBeenCalledWith(defaultScrollToConfig);
    });
  });
});
