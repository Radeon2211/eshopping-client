import React from 'react';
import { mount } from 'enzyme';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CartItemAdded, { SC } from './CartItemAdded';
import Loader from '../../UI/Loader';
import theme from '../../../styled/theme';

const mockStore = configureMockStore([thunk]);

const createStore = (cart, productDetails, isCartLoading) =>
  mockStore({
    auth: { cart },
    product: { productDetails },
    ui: { isCartLoading },
  });

const defaultProduct = {
  _id: '123',
  name: 'test name',
  price: 5,
  photo: false,
};

const defaultCart = [{ _id: 'itemId', quantity: 3, product: defaultProduct }];

const setUp = (cart = defaultCart, product = defaultProduct, isLoading = false) => {
  const store = createStore(cart, product, isLoading);
  return mount(
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <CartItemAdded />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

describe('<CartItemAdded />', () => {
  describe('Check how everything render', () => {
    it('Should render <Loader /> and NOT render <SC.ProductPreview />', () => {
      const wrapper = setUp(undefined, undefined, true);
      expect(wrapper.find(Loader)).toHaveLength(1);
      expect(wrapper.find(SC.ProductPreview)).toHaveLength(0);
    });

    it('Should render <Loader /> and NOT render <SC.ProductPreview /> if added product is not in cart yet', () => {
      const wrapper = setUp([]);
      expect(wrapper.find(Loader)).toHaveLength(1);
      expect(wrapper.find(SC.ProductPreview)).toHaveLength(0);
    });

    it('Should NOT render <Loader /> and should render <SC.ProductPreview />', () => {
      const wrapper = setUp();
      expect(wrapper.find(Loader)).toHaveLength(0);
      expect(wrapper.find(SC.ProductPreview)).toHaveLength(1);
    });

    it('Should render proper data about default product', () => {
      const wrapper = setUp();
      expect(wrapper.find('.name').text()).toEqual('3x test name');
      expect(wrapper.find('.price').text()).toEqual('$15 (total in the cart 3 x $5)');
    });

    it('Should render proper price text', () => {
      const product = { ...defaultProduct, price: 520.21 };
      const cart = [{ _id: 'itemId', quantity: 4, product }];
      const wrapper = setUp(cart, product);
      expect(wrapper.find('.price').text()).toEqual('$2,080.84 (total in the cart 4 x $520.21)');
    });
  });
});
