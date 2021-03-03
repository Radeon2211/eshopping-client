import React from 'react';
import { shallow } from 'enzyme';
import LoggedInLinks from './LoggedInLinks';
import { checkProps } from '../../../shared/testUtility';

const setUp = (username, status) => {
  const props = {
    username,
    status,
  };

  return shallow(<LoggedInLinks {...props} />);
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

  describe('Check how renders', () => {
    it('Should render version for user with status active', () => {
      const wrapper = setUp('username', 'active');
      expect(wrapper).toMatchSnapshot();
    });

    it('Should render version for user with status pending', () => {
      const wrapper = setUp('username', 'pending');
      expect(wrapper).toMatchSnapshot();
    });
  });
});
