import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CartAndTransactionItems, { SC } from './CartAndTransactionItems';
import CartItem from './CartItem/CartItem';
import TransactionAndOrderProdItem from '../TransactionAndOrderProdItem/TransactionAndOrderProdItem';
import theme from '../../styled/theme';
import {
  checkProps,
  createCartItem,
  createTransactionAndOrderProdItem,
} from '../../shared/testUtility';
import { itemTypes } from '../../shared/constants';

const mockStore = configureMockStore([thunk]);

const defaultHistory = {
  listen: jest.fn(),
  createHref: jest.fn(),
  location: { pathname: '/cart' },
};

const defaultStore = mockStore({});

const setUp = (items, type, isCartLoading = false) => {
  const props = {
    items,
    type,
    isCartLoading,
  };
  return mount(
    <Router history={defaultHistory}>
      <Provider store={defaultStore}>
        <ThemeProvider theme={theme}>
          <CartAndTransactionItems {...props} />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

describe('<CartAndTransactionItems />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const props = {
        items: [{ _id: 'i1' }],
        type: itemTypes.CART,
        isCartLoading: false,
      };
      expect(checkProps(CartAndTransactionItems, props)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(CartAndTransactionItems, {})).not.toBe(null);
    });
  });

  describe('Check how render - CART ITEMS', () => {
    it('Should render one <SC.SingleSeller /> with correct data and two <CartItem />', () => {
      const items = [createCartItem('u1', 'user1'), createCartItem('u1', 'user1')];
      const wrapper = setUp(items, itemTypes.CART);
      expect(wrapper.find(SC.SingleSeller)).toHaveLength(1);
      expect(wrapper.find('[data-test="user-link"]').first().prop('to')).toEqual('/user/user1?p=1');
      expect(wrapper.find('[data-test="user-link"]').first().text()).toEqual('user1');
      expect(wrapper.find(CartItem)).toHaveLength(2);
    });

    it('Should render three <SC.SingleSeller /> and five <CartItem />', () => {
      const items = [
        createCartItem('u1', 'user1'),
        createCartItem('u1', 'user1'),
        createCartItem('u2', 'user2'),
        createCartItem('u3', 'user3'),
        createCartItem('u3', 'user3'),
      ];
      const wrapper = setUp(items, itemTypes.CART);
      expect(wrapper.find(SC.SingleSeller)).toHaveLength(3);
      expect(wrapper.find(CartItem)).toHaveLength(5);
    });
  });

  describe('Check how render - TRANSACTION ITEMS', () => {
    it('Should render one <SC.SingleSeller /> with correct data and two <TransactionAndOrderProdItem />', () => {
      const items = [
        createTransactionAndOrderProdItem('u1', 'user1'),
        createTransactionAndOrderProdItem('u1', 'user1'),
      ];
      const wrapper = setUp(items, itemTypes.TRANSACTION);
      expect(wrapper.find(SC.SingleSeller)).toHaveLength(1);
      expect(wrapper.find('[data-test="user-link"]').first().prop('to')).toEqual('/user/user1?p=1');
      expect(wrapper.find('[data-test="user-link"]').first().text()).toEqual('user1');
      expect(wrapper.find(TransactionAndOrderProdItem)).toHaveLength(2);
    });

    it('Should render three <SC.SingleSeller /> and five <TransactionAndOrderProdItem />', () => {
      const items = [
        createTransactionAndOrderProdItem('u1', 'user1'),
        createTransactionAndOrderProdItem('u1', 'user1'),
        createTransactionAndOrderProdItem('u2', 'user2'),
        createTransactionAndOrderProdItem('u3', 'user3'),
        createTransactionAndOrderProdItem('u3', 'user3'),
      ];
      const wrapper = setUp(items, itemTypes.TRANSACTION);
      expect(wrapper.find(SC.SingleSeller)).toHaveLength(3);
      expect(wrapper.find(TransactionAndOrderProdItem)).toHaveLength(5);
    });
  });
});
