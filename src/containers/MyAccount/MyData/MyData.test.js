import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MyData from './MyData';
import SingleInfo from './SingleInfo/SingleInfo';
import theme from '../../../styled/theme';
import { defaultUserProfile } from '../../../shared/testUtility';
import { singleInfoNames } from '../../../shared/constants';

const mockStore = configureMockStore([thunk]);

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
  describe('Check how renders', () => {
    it('Should render 6 <SingleInfo />', () => {
      const wrapper = setUp(defaultUserProfile);

      const singleInfos = wrapper.find(SingleInfo);
      expect(singleInfos).toHaveLength(6);
      expect(singleInfos.at(0).prop('name')).toEqual(singleInfoNames.USERNAME);
      expect(singleInfos.at(1).prop('name')).toEqual(singleInfoNames.NAME);
      expect(singleInfos.at(2).prop('name')).toEqual(singleInfoNames.EMAIL);
      expect(singleInfos.at(3).prop('name')).toEqual(singleInfoNames.ADDRESS);
      expect(singleInfos.at(4).prop('name')).toEqual(singleInfoNames.CONTACTS);
      expect(singleInfos.at(5).prop('name')).toEqual(singleInfoNames.PHONE_NUMBER);
    });

    it('Should render pending user actions and pending user content and NOT render change password btn and admin content if user has status pending', () => {
      const wrapper = setUp({ ...defaultUserProfile, status: 'pending' });

      expect(wrapper.find('[data-test="pending-user-actions"]').length).toBeGreaterThan(0);
      expect(wrapper.find('[data-test="pending-user-content"]').length).toBeGreaterThan(0);
      expect(wrapper.find('[data-test="change-password-btn"]')).toHaveLength(0);
      expect(wrapper.find('[data-test="admin-content"]')).toHaveLength(0);
    });

    it('Should NOT render pending user actions, pending user content, admin content and should render change password btn if user has status active', () => {
      const wrapper = setUp({ ...defaultUserProfile, status: 'active' });

      expect(wrapper.find('[data-test="pending-user-actions"]')).toHaveLength(0);
      expect(wrapper.find('[data-test="pending-user-content"]')).toHaveLength(0);
      expect(wrapper.find('[data-test="change-password-btn"]').length).toBeGreaterThan(0);
      expect(wrapper.find('[data-test="admin-content"]')).toHaveLength(0);
    });

    it('Should NOT render pending user actions, pending user content and should render change password btn and admin content if user has status active', () => {
      const wrapper = setUp({ ...defaultUserProfile, status: 'active', isAdmin: true });
      expect(wrapper.find('[data-test="pending-user-actions"]')).toHaveLength(0);
      expect(wrapper.find('[data-test="pending-user-content"]')).toHaveLength(0);
      expect(wrapper.find('[data-test="change-password-btn"]').length).toBeGreaterThan(0);
      expect(wrapper.find('[data-test="admin-content"]').length).toBeGreaterThan(0);
    });
  });
});
