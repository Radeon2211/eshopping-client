import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import OtherUser from './OtherUser';
import Loader from '../../components/UI/Loader';
import theme from '../../styled/theme';
import { PRODUCTS_PER_PAGE } from '../../shared/constants';

const mockStore = configureMockStore([thunk]);

const defaultOtherUser = { _id: 'u1', username: 'user1' };

const setUp = (otherUser, currentUserUsername = 'testUser', replaceFn = jest.fn()) => {
  const props = {
    match: {
      params: { username: otherUser?.username },
    },
    location: { search: 'p=1' },
    history: { replace: replaceFn },
  };

  const store = mockStore({
    ui: { isDataLoading: false, productsPerPage: PRODUCTS_PER_PAGE },
    auth: {
      otherUser,
      profile: {
        username: currentUserUsername,
      },
    },
    product: {},
  });

  return mount(
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <OtherUser {...props} />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

describe('<OtherUser />', () => {
  describe('Check how everything render', () => {
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

    it('Should render email and phone number and NOT render private data <Heading /> if other user has set it to public', () => {
      const otherUser = { ...defaultOtherUser, email: 'test@email.com', phone: '123' };
      const wrapper = setUp(otherUser);
      expect(wrapper.find('[data-test="private-data"]')).toHaveLength(0);
      expect(wrapper.find('.single-data')).toHaveLength(2);
      expect(wrapper.find('[data-test="email-value"]').at(0).text()).toEqual('test@email.com');
      expect(wrapper.find('[data-test="phone-value"]').at(0).text()).toEqual('123');
    });

    it('Should render only phone number if other user has only phone number set to public', () => {
      const otherUser = { ...defaultOtherUser, phone: '123' };
      const wrapper = setUp(otherUser);
      expect(wrapper.find('.single-data')).toHaveLength(1);
      expect(wrapper.find('[data-test="phone-value"]').at(0).text()).toEqual('123');
    });
  });

  describe('Check how history behaves', () => {
    it('Should call replace if otherUser is the same as current user', () => {
      const replaceFn = jest.fn();
      setUp(defaultOtherUser, 'user1', replaceFn);
      expect(replaceFn).toHaveBeenCalledTimes(1);
      expect(replaceFn).toHaveBeenCalledWith('/my-account/data');
    });

    it('Should NOT call replace if otherUser is not the same as current user', () => {
      const replaceFn = jest.fn();
      setUp(defaultOtherUser, 'differentUser', replaceFn);
      expect(replaceFn).toHaveBeenCalledTimes(0);
    });
  });
});
