import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CartAndTransactionItems from './CartAndTransactionItems';
import theme from '../../styled/theme';
import {
  createCartItem,
  createTransactionAndOrderProdItem,
} from '../../shared/testUtility/testUtility';
import { itemTypes } from '../../shared/constants';

const mockStore = configureMockStore([thunk]);

const defaultStore = mockStore({});

const setUp = (items, type) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/cart' },
    push: jest.fn(),
  };

  return {
    ...render(
      <Router history={history}>
        <Provider store={defaultStore}>
          <ThemeProvider theme={theme}>
            <CartAndTransactionItems items={items} type={type} isCartLoading={false} />
          </ThemeProvider>
        </Provider>
      </Router>,
    ),
    history,
  };
};

afterEach(cleanup);

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
            productId: 'p1',
            sellerUsername: 'user1',
          }),
          createTransactionAndOrderProdItem({
            productId: 'p2',
            sellerUsername: 'user2',
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
      const { history } = setUp(
        [
          createCartItem({
            sellerUsername: 'user1',
          }),
        ],
        itemTypes.CART,
      );

      fireEvent.click(screen.getByTestId('CartAndTransactionItems-item-seller-link'));
      expect(history.push).toHaveBeenCalledWith('/user/user1?p=1');
    });
  });
});
