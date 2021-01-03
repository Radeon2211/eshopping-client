import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CartItem from './CartItem';
import theme from '../../../styled/theme';
import { checkProps, createCartItem } from '../../../shared/testUtility';
import { baseURL } from '../../../axios';
import noPhoto from '../../../images/no-photo.png';

const mockStore = configureMockStore([thunk]);

const defaultHistory = {
  listen: jest.fn(),
  createHref: jest.fn(),
  location: { pathname: '/cart' },
};

const defaultStore = mockStore({});

const setUp = (data, isCartLoading = false) => {
  const props = {
    data,
    isCartLoading,
  };
  return mount(
    <Router history={defaultHistory}>
      <Provider store={defaultStore}>
        <ThemeProvider theme={theme}>
          <CartItem {...props} />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

describe('<CartItem />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const props = {
        data: { _id: 'i1' },
        isCartLoading: false,
      };
      expect(checkProps(CartItem, props)).toBeUndefined();
    });

    it('Should throw a warning', () => {
      expect(checkProps(CartItem, {})).not.toBe(null);
    });
  });

  describe('Checks how everything render', () => {
    it('Should render correctly with full data', () => {
      const data = createCartItem('u1', 'user1', 5, 'p1', 299.98, 'productName', 6, true);
      const wrapper = setUp(data);
      expect(
        wrapper.find('[data-test="product-link"]').every((link) => {
          return link.prop('to') === '/products/p1';
        }),
      );
      expect(wrapper.find('img').prop('src')).toEqual(`${baseURL}/products/p1/photo`);
      expect(wrapper.find('.name').text()).toEqual('productName');
      expect(wrapper.find('.quantity-number').text()).toEqual('of 6');
      expect(wrapper.find('.overall-price').text()).toEqual('$1,499.90');
      expect(wrapper.find('.price-per-piece').first().text()).toEqual('per piece $299.98');
    });

    it('Should NOT render price per piece and should render default photo', () => {
      const data = createCartItem();
      const wrapper = setUp(data);
      expect(wrapper.find('img').prop('src')).toBe(noPhoto);
      expect(wrapper.find('.price-per-piece')).toHaveLength(0);
    });
  });
});
