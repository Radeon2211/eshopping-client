import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CartAndTransactionItems from './CartAndTransactionItems';
import theme from '../../styled/theme';
import {
  checkProps,
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
  describe('check prop types', () => {
    it('should NOT throw a warning if type is CART', () => {
      const props = {
        items: [createTransactionAndOrderProdItem()],
        type: itemTypes.CART,
        isCartLoading: false,
      };
      expect(checkProps(CartAndTransactionItems, props)).toBeUndefined();
    });

    it('should NOT throw a warning if type is TRANSACTION', () => {
      const props = {
        items: [createTransactionAndOrderProdItem()],
        type: itemTypes.TRANSACTION,
        isCartLoading: false,
      };
      expect(checkProps(CartAndTransactionItems, props)).toBeUndefined();
    });

    it('should throw a warning if type is ORDER', () => {
      const props = {
        items: [createTransactionAndOrderProdItem()],
        type: itemTypes.ORDER,
        isCartLoading: false,
      };
      expect(checkProps(CartAndTransactionItems, props)).not.toBe(null);
    });

    it('should throw a warning if props are empty', () => {
      expect(checkProps(CartAndTransactionItems, {})).not.toBe(null);
    });
  });

  describe('check how renders', () => {
    it('should render everything with one seller and one cart item', () => {
      const { asFragment } = setUp(
        [
          createCartItem({
            sellerUsername: 'user1',
          }),
        ],
        itemTypes.CART,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render everything with two sellers, each with one transaction item', () => {
      const { asFragment } = setUp(
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
      expect(asFragment()).toMatchSnapshot();
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
