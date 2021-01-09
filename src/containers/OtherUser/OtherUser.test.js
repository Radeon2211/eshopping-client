import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import OtherUser from './OtherUser';
import Loader from '../../components/UI/Loader';
import theme from '../../styled/theme';
import { PRODUCTS_PER_PAGE } from '../../shared/constants';

const mockStore = configureMockStore([thunk]);

const defaultProps = {
  match: {
    params: { username: 'user1' },
  },
  location: { search: 'p=1' },
};

const defaultOtherUser = { _id: 'u1', username: 'user1' };

const setUp = (otherUser) => {
  const store = mockStore({
    ui: { isDataLoading: false, productsPerPage: PRODUCTS_PER_PAGE },
    auth: { otherUser },
    product: {},
  });

  return mount(
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <OtherUser {...defaultProps} />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

describe('<OtherUser />', () => {
  it('Should render <Loader /> if other user is undefined', () => {
    const wrapper = setUp(undefined);
    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it('Should render not found <Heading /> if other user is null', () => {
    const wrapper = setUp(null);
    expect(wrapper.find('[data-test="not-found"]').length).toBeGreaterThan(0);
  });

  it('Should render default username and private data <Heading /> if other user has hidden contact data', () => {
    const wrapper = setUp(defaultOtherUser);
    expect(wrapper.find('[data-test="private-data"]').length).toBeGreaterThan(0);
    expect(wrapper.find('[data-test="username"]').first().text()).toEqual('user1');
  });

  it('Should render email and phone number if other user has set it to public', () => {
    const otherUser = { ...defaultOtherUser, email: 'test@email.com', phone: '123' };
    const wrapper = setUp(otherUser);
    expect(wrapper.find('.single-data')).toHaveLength(2);
    expect(wrapper.find('.data-value').first().text()).toEqual('test@email.com');
    expect(wrapper.find('.data-value').last().text()).toEqual('123');
  });

  it('Should render only phone number if other user has only phone number set to public', () => {
    const otherUser = { ...defaultOtherUser, phone: '123' };
    const wrapper = setUp(otherUser);
    expect(wrapper.find('.single-data')).toHaveLength(1);
    expect(wrapper.find('.data-value').first().text()).toEqual('123');
  });
});
