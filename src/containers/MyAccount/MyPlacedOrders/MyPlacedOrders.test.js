import { waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MyPlacedOrders from './MyPlacedOrders';
import {
  createOrder,
  createTransactionAndOrderProdItem,
  renderAppPart,
} from '../../../shared/testUtility/testUtility';
import { defaultScrollToConfig } from '../../../shared/constants';
import useLastLocation from '../../../shared/hooks/useLastLocation';

const mockStore = configureMockStore([thunk]);

const products = [
  createTransactionAndOrderProdItem({
    _id: 'p1',
    price: 80.2,
    quantity: 4,
    name: 'product1',
    photo: true,
    seller: {
      username: 'sellerUser',
    },
  }),
];

const defaultStore = mockStore({
  auth: {
    placedOrders: [
      createOrder({
        _id: 'o1',
        products,
        seller: {
          username: 'sellerUser',
        },
        buyer: {
          username: 'buyerUser',
        },
        overallPrice: 320.8,
      }),
    ],
    orderCount: 1,
  },
  ui: {
    isDataLoading: false,
  },
});

const setUp = () => {
  return renderAppPart(<MyPlacedOrders />, {
    pathname: '/my-account/placed-orders',
    search: '?p=1',
    store: defaultStore,
  });
};

jest.mock('../../../shared/hooks/useLastLocation', () => ({
  __esModule: true,
  default: jest.fn(),
}));

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('<MyPlacedOrders />', () => {
  describe('check how renders', () => {
    it('should render everything correctly with given default data', async () => {
      setUp();
      expect(screen.getAllByTestId('OrderList-single-order')).toHaveLength(1);
      await waitFor(() => {
        expect(document.title).toEqual('Your placed orders - E-Shopping');
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
