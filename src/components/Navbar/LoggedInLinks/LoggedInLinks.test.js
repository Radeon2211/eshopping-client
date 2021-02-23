import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import LoggedInLinks, { SC } from './LoggedInLinks';
import CartLink from './CartLink/CartLink';
import Dropdown from './Dropdown/Dropdown';
import MyIcon from '../../UI/MyIcon';
import { ReactComponent as ArrowIcon } from '../../../images/icons/arrow.svg';
import { ReactComponent as SettingsIcon } from '../../../images/icons/settings.svg';
import theme from '../../../styled/theme';
import { checkProps } from '../../../shared/testUtility';

const mockStore = configureMockStore([thunk]);

const defaultStore = mockStore({
  auth: { cart: [] },
});

const setUp = (username, status) => {
  const props = {
    username,
    status,
  };

  return mount(
    <Provider store={defaultStore}>
      <Router>
        <ThemeProvider theme={theme}>
          <LoggedInLinks {...props} />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

describe('<LoggedInLinks />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning if status is active', () => {
      const props = {
        username: 'username',
        status: 'active',
      };
      expect(checkProps(LoggedInLinks, props)).toBeUndefined();
    });

    it('Should NOT throw a warning if status is pending', () => {
      const props = {
        username: 'username',
        status: 'pending',
      };
      expect(checkProps(LoggedInLinks, props)).toBeUndefined();
    });

    it('Should throw a warning if invalid status is passed', () => {
      const props = {
        username: 'username',
        status: 'invalid',
      };
      expect(checkProps(LoggedInLinks, props)).not.toBe(null);
    });

    it('Should throw a warning if no props are passes', () => {
      expect(checkProps(LoggedInLinks, {})).not.toBe(null);
    });
  });

  describe('Check how everything renders', () => {
    it('Should render version for user with status active', () => {
      const wrapper = setUp('username', 'active');

      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
      expect(wrapper.find('[data-test="my-account-link"]')).toHaveLength(0);
      expect(wrapper.find(CartLink)).toHaveLength(1);
      expect(wrapper.find(SC.User)).toHaveLength(1);
      expect(wrapper.find(SC.User).prop('onClick')).toBeDefined();
      expect(wrapper.find('[data-test="username"]').at(0).text()).toEqual('username');
      expect(wrapper.find(MyIcon).find(ArrowIcon)).toHaveLength(1);
      expect(wrapper.find(MyIcon).find(SettingsIcon)).toHaveLength(0);
      expect(wrapper.find(Dropdown)).toHaveLength(1);
    });

    it('Should render version for user with status pending', () => {
      const wrapper = setUp('username', 'pending');

      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
      expect(wrapper.find('[data-test="my-account-link"]').length).toBeGreaterThan(0);
      expect(wrapper.find('[data-test="my-account-link"]').at(0).prop('to')).toEqual(
        '/my-account/data',
      );
      expect(wrapper.find(CartLink)).toHaveLength(0);
      expect(wrapper.find(SC.User)).toHaveLength(1);
      expect(wrapper.find(SC.User).prop('onClick')).not.toBeDefined();
      expect(wrapper.find('[data-test="username"]').at(0).text()).toEqual('username');
      expect(wrapper.find(MyIcon).find(ArrowIcon)).toHaveLength(0);
      expect(wrapper.find(MyIcon).find(SettingsIcon)).toHaveLength(1);
      expect(wrapper.find(Dropdown)).toHaveLength(0);
    });
  });
});
