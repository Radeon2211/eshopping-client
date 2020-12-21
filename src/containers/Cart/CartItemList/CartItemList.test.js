import React from 'react';
import { mount } from 'enzyme';
import { Router, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CartItemList from './CartItemList';
import * as SC from './CartItemList.sc';
import CartItem from './CartItem/CartItem';
import theme from '../../../styled/theme';
import { checkProps, createCartItem } from '../../../shared/testUtility';

const mockStore = configureMockStore([thunk]);

const defaultHistory = {
  listen: jest.fn(),
  createHref: jest.fn(),
  location: { pathname: '/cart' },
};

const defaultStore = mockStore({});

const setUp = (cart, isCartLoading = false) => {
  const props = {
    cart,
    isCartLoading,
  };
  return mount(
    <Router history={defaultHistory}>
      <Provider store={defaultStore}>
        <ThemeProvider theme={theme}>
          <CartItemList {...props} />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

describe('<CartItemList />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const props = {
        cart: [{ _id: 'i1' }],
        isCartLoading: false,
      };
      expect(checkProps(CartItemList, props)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(CartItemList, {})).not.toBe(null);
    });
  });

  describe('Checks how everything render', () => {
    it('Should render one <SC.SingleSeller /> and two <CartItem />', () => {
      const cart = [createCartItem('u1'), createCartItem('u1')];
      const wrapper = setUp(cart);
      expect(wrapper.find(SC.SingleSeller)).toHaveLength(1);
      expect(wrapper.find(CartItem)).toHaveLength(2);
    });

    it('Should render three <SC.SingleSeller /> and five <CartItem />', () => {
      const cart = [
        createCartItem('u1', 'user1'),
        createCartItem('u1', 'user1'),
        createCartItem('u2', 'user2'),
        createCartItem('u3', 'user3'),
        createCartItem('u3', 'user3'),
      ];
      const wrapper = setUp(cart);
      expect(wrapper.find(SC.SingleSeller)).toHaveLength(3);
      expect(wrapper.find(CartItem)).toHaveLength(5);
    });

    it('Should render one <SC.SingleSeller /> with correct data', () => {
      const cart = [createCartItem('u1', 'user1')];
      const wrapper = setUp(cart);
      expect(wrapper.find(Link).first().text()).toBe('user1');
      expect(wrapper.find(Link).first().prop('to')).toBe('/user/user1?p=1');
    });
  });
});
