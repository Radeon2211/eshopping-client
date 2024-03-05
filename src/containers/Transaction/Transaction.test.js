import { waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Transaction from './Transaction';
import {
  createTransactionAndOrderProdItem,
  defaultDeliveryAddress,
  renderAppPart,
} from '../../shared/testUtility/testUtility';
import { defaultScrollToConfig } from '../../shared/constants';

const mockStore = configureMockStore([thunk]);

const setUp = (transaction) => {
  const store = mockStore({
    auth: {
      transaction,
      deliveryAddress: defaultDeliveryAddress,
    },
  });
  store.dispatch = jest.fn();

  return {
    ...renderAppPart(<Transaction />, {
      pathname: `/transaction`,
      store,
    }),
    store,
  };
};

const mockedUseNavigateFn = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigateFn,
}));

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('<Transaction />', () => {
  describe('check how renders', () => {
    it('should render everything correctly with two items from one user', async () => {
      const transaction = [
        createTransactionAndOrderProdItem({
          _id: 'p1',
          price: 10.6,
          quantity: 4,
          name: 'product1',
          photo: false,
          seller: {
            username: 'user1',
          },
        }),
        createTransactionAndOrderProdItem({
          _id: 'p2',
          price: 299.98,
          quantity: 6,
          name: 'product2',
          photo: false,
          seller: {
            username: 'user1',
          },
        }),
      ];
      setUp(transaction);
      expect(screen.getByTestId('Transaction-content')).toBeInTheDocument();
      expect(screen.getAllByTestId('CartAndTransactionItems-item')).toHaveLength(1);
      expect(screen.getAllByTestId('TransactionAndOrderProdItem')).toHaveLength(2);
      await waitFor(() => {
        expect(document.title).toEqual('Transaction summary - E-Shopping');
      });
    });

    it('should render nothing if transaction is empty', () => {
      setUp([]);
      expect(screen.queryByTestId('Transaction-content')).not.toBeInTheDocument();
    });

    it('should render nothing if transaction is falsy', () => {
      setUp(undefined);
      expect(screen.queryByTestId('Transaction-content')).not.toBeInTheDocument();
    });
  });

  describe('check useEffect()', () => {
    it('should replace url if transaction is falsy and call scrollTo()', () => {
      setUp(undefined);
      expect(mockedUseNavigateFn).toHaveBeenCalledWith('/cart', { replace: true });
      expect(window.scrollTo).toHaveBeenCalledWith(defaultScrollToConfig);
    });

    it('should replace url if transaction length is 0 and call scrollTo()', () => {
      setUp([]);
      expect(mockedUseNavigateFn).toHaveBeenCalledWith('/cart', { replace: true });
      expect(window.scrollTo).toHaveBeenCalledWith(defaultScrollToConfig);
    });

    it('should NOT replace url if transaction length is more than 1 and call scrollTo()', () => {
      setUp([createTransactionAndOrderProdItem()]);
      expect(mockedUseNavigateFn).not.toHaveBeenCalled();
      expect(window.scrollTo).toHaveBeenCalledWith(defaultScrollToConfig);
    });
  });
});
