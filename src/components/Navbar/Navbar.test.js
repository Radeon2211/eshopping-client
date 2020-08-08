import React from 'react';
import { shallow } from 'enzyme';
import Navbar from './Navbar';
import LoggedInLinks from './LoggedInLinks/LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks/LoggedOutLinks';

const setUp = (props = {}) => {
  return shallow(<Navbar {...props} />);
};

describe('<Navbar />', () => {
  describe('User is logged in', () => {
    let navbar;
    beforeEach(() => {
      const props = {
        userProfile: {
          username: 'UserName',
        },
      };
      navbar = setUp(props);
    });
    it('Should render one <LoggedInLinks />', () => {
      expect(navbar.find(LoggedInLinks)).toHaveLength(1);
    });
  });

  describe('User is logged out', () => {
    let navbar;
    beforeEach(() => {
      navbar = setUp();
    });
    it('Should render one <LoggedOutLinks />', () => {
      expect(navbar.find(LoggedOutLinks)).toHaveLength(1);
    });
  });
});