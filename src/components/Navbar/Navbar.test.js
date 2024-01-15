import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Navbar from './Navbar';
import {
  defaultUserProfile,
  renderAppPart,
  testRouterPushCall,
} from '../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);
const defaultStore = mockStore({
  auth: { cart: [] },
});

const setUp = (userProfile, searchParam = '?p=1', pushFn = jest.fn()) => {
  return {
    ...renderAppPart(<Navbar userProfile={userProfile} />, {
      pathname: '/products',
      search: searchParam,
      push: pushFn,
      store: defaultStore,
    }),
  };
};

describe('<Navbar />', () => {
  it('should render <LoggedInLinks /> if user is logged in', () => {
    setUp(defaultUserProfile);
    expect(screen.getByTestId('LoggedInLinks')).toBeInTheDocument();
  });

  it('should render <LoggedOutLinks /> if user is logged out', () => {
    setUp(null);
    expect(screen.getByTestId('LoggedOutLinks')).toBeInTheDocument();
  });

  it('should call push after clicking at logo if current path is other than default', () => {
    const pushFn = jest.fn();
    setUp(null, '?p=2', pushFn);
    fireEvent.click(screen.getByTestId('Navbar-header-link'));
    testRouterPushCall(pushFn, 0, '/products', '?p=1');
  });
});
