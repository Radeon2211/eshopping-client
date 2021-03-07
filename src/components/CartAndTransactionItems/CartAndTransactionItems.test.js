import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
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
} from '../../shared/testUtility';
import { itemTypes } from '../../shared/constants';

const mockStore = configureMockStore([thunk]);

const defaultStore = mockStore({});

const setUp = (items, type, pushFn = jest.fn()) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/cart' },
    push: pushFn,
  };

  return render(
    <Router history={history}>
      <Provider store={defaultStore}>
        <ThemeProvider theme={theme}>
          <CartAndTransactionItems items={items} type={type} isCartLoading={false} />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

afterEach(cleanup);

describe('<CartAndTransactionItems />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning if type is CART', () => {
      const props = {
        items: [{ _id: 'i1' }],
        type: itemTypes.CART,
        isCartLoading: false,
      };
      expect(checkProps(CartAndTransactionItems, props)).toBeUndefined();
    });

    it('Should NOT throw a warning if type is TRANSACTION', () => {
      const props = {
        items: [{ _id: 'i1' }],
        type: itemTypes.TRANSACTION,
        isCartLoading: false,
      };
      expect(checkProps(CartAndTransactionItems, props)).toBeUndefined();
    });

    it('Should throw a warning if type is ORDER', () => {
      const props = {
        items: [{ _id: 'i1' }],
        type: itemTypes.ORDER,
        isCartLoading: false,
      };
      expect(checkProps(CartAndTransactionItems, props)).not.toBe(null);
    });

    it('Should throw a warning if props are empty', () => {
      expect(checkProps(CartAndTransactionItems, {})).not.toBe(null);
    });
  });

  describe('Check how renders', () => {
    it('Should render everything with one seller and one cart item', () => {
      const { asFragment } = setUp([createCartItem('user1')], itemTypes.CART);
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render everything with two sellers, each with one transaction item', () => {
      const { asFragment } = setUp(
        [
          createTransactionAndOrderProdItem('p1', 'user1'),
          createTransactionAndOrderProdItem('p2', 'user2'),
        ],
        itemTypes.TRANSACTION,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should call push with correct path after click on user link', () => {
      const pushFn = jest.fn();
      setUp([createCartItem('user1')], itemTypes.CART, pushFn);
      fireEvent.click(screen.getByTestId('CartAndTransactionItems-seller-link'));
      expect(pushFn).toHaveBeenCalledTimes(1);
      expect(pushFn).toHaveBeenCalledWith('/user/user1?p=1');
    });
  });
});
