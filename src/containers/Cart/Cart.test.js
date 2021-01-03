import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import Cart from './Cart';
import * as SC from './Cart.sc';
import SideBySide from '../../components/UI/SideBySide';
import theme from '../../styled/theme';
import { createCartItem } from '../../shared/testUtility';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import ToPayInfo from '../../components/UI/ToPayInfo';

const mockStore = configureMockStore([thunk]);

const defaultHistory = {
  listen: jest.fn(),
  createHref: jest.fn(),
  location: { pathname: '/cart' },
};

const setUp = (cart, isCartLoading = false) => {
  const store = mockStore({
    auth: { cart },
    ui: { isCartLoading },
  });
  return mount(
    <Router history={defaultHistory}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Cart />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

window.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
}));

describe('<Cart />', () => {
  it('Should render <SideBySide /> and <LoadingOverlay /> and correct price if cart items length is more than 0 and isCartLoading is true', () => {
    const wrapper = setUp([createCartItem('u1', 'user1', 5, 'p1', 499.97)], true);
    expect(wrapper.find(SideBySide).length).toBeGreaterThan(0);
    expect(wrapper.find(LoadingOverlay)).toHaveLength(1);
    expect(wrapper.find(ToPayInfo).text()).toEqual('To pay$2,499.85');
  });

  it('Should render <SC.EmptyCart /> if cart is empty and NOT render <LoadingOverlay />', () => {
    const wrapper = setUp([]);
    expect(wrapper.find(SC.EmptyCart)).toHaveLength(1);
    expect(wrapper.find(LoadingOverlay)).toHaveLength(0);
  });

  it('Should render cart error <Heading /> if cart is null', () => {
    const wrapper = setUp(null);
    expect(wrapper.find('[data-test="cart-error-heading"]').length).toBeGreaterThan(0);
  });
});
