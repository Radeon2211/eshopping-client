import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import Cart from './Cart';
import SideBySide from '../../components/UI/SideBySide';
import theme from '../../styled/theme';
import { createCartItem } from '../../shared/testUtility';

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
  it('Should render <SideBySide /> if cart items length is more than 0', () => {
    const wrapper = setUp([createCartItem()]);
    expect(wrapper.find(SideBySide).length).toBeGreaterThan(0);
  });

  it('Should render cart empty and cart info <Heading /> if cart is empty', () => {
    const wrapper = setUp([]);
    expect(wrapper.find('[data-test="cart-empty-heading"]').length).toBeGreaterThan(0);
    expect(wrapper.find('[data-test="cart-info-heading"]').length).toBeGreaterThan(0);
  });

  it('Should render cart error <Heading /> if cart is null', () => {
    const wrapper = setUp(null);
    expect(wrapper.find('[data-test="cart-error-heading"]').length).toBeGreaterThan(0);
  });
});
