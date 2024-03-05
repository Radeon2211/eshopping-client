import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CartAndTransactionItems from './CartAndTransactionItems';
import {
  createCartItem,
  createTransactionAndOrderProdItem,
  renderAppPart,
  testRouterPushCall,
} from '../../shared/testUtility/testUtility';
import { itemTypes } from '../../shared/constants';

const mockStore = configureMockStore([thunk]);

const defaultStore = mockStore({});

const setUp = (items, type, pushFn = jest.fn()) => {
  return {
    ...renderAppPart(<CartAndTransactionItems items={items} type={type} isCartLoading={false} />, {
      pathname: '/cart',
      push: pushFn,
      store: defaultStore,
    }),
  };
};

describe('<CartAndTransactionItems />', () => {
  describe('check how renders', () => {
    it('should render everything with one seller and one cart item', () => {
      setUp(
        [
          createCartItem({
            sellerUsername: 'user1',
          }),
        ],
        itemTypes.CART,
      );
      expect(screen.getAllByTestId('CartItem')).toHaveLength(1);
      expect(screen.getAllByTestId('CartAndTransactionItems-item')).toHaveLength(1);
      expect(screen.getByText('user1')).toBeInTheDocument();
    });

    it('should render everything with two sellers, each with one transaction item', () => {
      setUp(
        [
          createTransactionAndOrderProdItem({
            _id: 'p1',
            seller: {
              username: 'user1',
            },
          }),
          createTransactionAndOrderProdItem({
            _id: 'p2',
            seller: {
              username: 'user2',
            },
          }),
        ],
        itemTypes.TRANSACTION,
      );
      expect(screen.getAllByTestId('CartAndTransactionItems-item')).toHaveLength(2);
      expect(screen.getAllByTestId('TransactionAndOrderProdItem')).toHaveLength(2);
      expect(screen.getByText('user1')).toBeInTheDocument();
      expect(screen.getByText('user2')).toBeInTheDocument();
    });

    it('should call push with correct path after click on user link', () => {
      const pushFn = jest.fn();
      setUp(
        [
          createCartItem({
            sellerUsername: 'user1',
          }),
        ],
        itemTypes.CART,
        pushFn,
      );

      fireEvent.click(screen.getByTestId('CartAndTransactionItems-item-seller-link'));
      testRouterPushCall(pushFn, 0, '/user/user1', '?p=1');
    });
  });
});
