import React from 'react';
import { shallow } from 'enzyme';
import Navbar from './Navbar';
import { defaultUserProfile } from '../../shared/testUtility';

const setUp = (props = {}) => {
  return shallow(<Navbar {...props} />);
};

describe('<Navbar />', () => {
  it('Should render <LoggedInLinks /> if user is logged in', () => {
    const props = {
      userProfile: defaultUserProfile,
    };
    const wrapper = setUp(props);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render <LoggedOutLinks /> if user is logged out', () => {
    const wrapper = setUp();
    expect(wrapper).toMatchSnapshot();
  });
});
