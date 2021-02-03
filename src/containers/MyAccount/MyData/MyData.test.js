import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MyData from './MyData';
import SingleInfo from './SingleInfo/SingleInfo';
import theme from '../../../styled/theme';
import { defaultDeliveryAddress } from '../../../shared/testUtility';
import { singleInfoNames } from '../../../shared/constants';

const mockStore = configureMockStore([thunk]);

const defaultProfile = {
  _id: 'testId',
  firstName: 'firstName',
  lastName: 'lastName',
  username: 'username',
  email: 'email@domain.com',
  contacts: {
    email: true,
    phone: true,
  },
  ...defaultDeliveryAddress,
};

const setUp = (profile) => {
  const store = mockStore({
    auth: { profile },
  });
  return mount(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MyData />
      </ThemeProvider>
    </Provider>,
  );
};

describe('<MyData />', () => {
  describe('Check how everything render', () => {
    it('Should render 6 <SingleInfo />, all-user-content and NOT render admin content if user is not an admin', () => {
      const wrapper = setUp(defaultProfile);

      const singleInfos = wrapper.find(SingleInfo);
      expect(singleInfos).toHaveLength(6);
      expect(singleInfos.at(0).prop('name')).toEqual(singleInfoNames.NAME);
      expect(singleInfos.at(1).prop('name')).toEqual(singleInfoNames.EMAIL);
      expect(singleInfos.at(2).prop('name')).toEqual(singleInfoNames.PHONE_NUMBER);
      expect(singleInfos.at(3).prop('name')).toEqual(singleInfoNames.ADDRESS);
      expect(singleInfos.at(4).prop('name')).toEqual(singleInfoNames.CONTACTS);
      expect(singleInfos.at(5).prop('name')).toEqual(singleInfoNames.USERNAME);

      expect(wrapper.find('[data-test="all-users-content"]').length).toBeGreaterThan(0);
      expect(wrapper.find('[data-test="admin-content"]')).toHaveLength(0);
    });

    it('Should render admin content if user is an admin', () => {
      const wrapper = setUp({ ...defaultProfile, isAdmin: true });
      expect(wrapper.find('[data-test="admin-content"]').length).toBeGreaterThan(0);
    });
  });
});
