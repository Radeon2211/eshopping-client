import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import CartLink, { SC } from './CartLink';
import theme from '../../../../styled/theme';

const mockStore = configureMockStore([thunk]);

const defaultHistory = {
  listen: jest.fn(),
  createHref: jest.fn(),
  location: { pathname: '/products' },
};

const setUp = (cart) => {
  const store = mockStore({
    auth: { cart },
  });
  return mount(
    <Router history={defaultHistory}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CartLink />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

describe('<CartLink />', () => {
  it('Should render <SC.Quantity /> with value 1', () => {
    const wrapper = setUp([{ _id: '1' }]);
    expect(wrapper.find(SC.Quantity).text()).toBe('1');
  });

  it('Should render <SC.Quantity /> with value 3', () => {
    const wrapper = setUp([{ _id: '1' }, { _id: '2' }, { _id: '3' }]);
    expect(wrapper.find(SC.Quantity).text()).toBe('3');
  });

  it('Should NOT render <SC.Quantity /> if cart is null', () => {
    const wrapper = setUp(null);
    expect(wrapper.find(SC.Quantity)).toHaveLength(0);
  });

  it('Should NOT render <SC.Quantity /> if cart has 0 length', () => {
    const wrapper = setUp([]);
    expect(wrapper.find(SC.Quantity)).toHaveLength(0);
  });
});
