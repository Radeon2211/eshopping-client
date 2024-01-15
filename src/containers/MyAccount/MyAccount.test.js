import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MyAccount from './MyAccount';
import {
  defaultUserProfile,
  renderAppPart,
  testRouterPushCall,
} from '../../shared/testUtility/testUtility';
import { userStatuses } from '../../shared/constants';

const mockStore = configureMockStore([thunk]);

const setUp = (userProfile, pushFn = jest.fn()) => {
  const store = mockStore({
    auth: { profile: userProfile },
  });

  return renderAppPart(<MyAccount />, {
    pathname: '/',
    push: pushFn,
    store,
  });
};

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('<MyAccount />', () => {
  it('should render navigation and all routes', () => {
    setUp(defaultUserProfile);
    expect(screen.getByTestId('MyAccount-navigation')).toBeInTheDocument();
    expect(screen.queryByTestId('MyAccount-pending-user-routes')).not.toBeInTheDocument();
    expect(screen.getByTestId('MyAccount-active-user-routes')).toBeInTheDocument();
  });

  it('should NOT render navigation and render only one route if user has status pending', () => {
    setUp({ ...defaultUserProfile, status: userStatuses.PENDING });
    expect(screen.queryByTestId('MyAccount-navigation')).not.toBeInTheDocument();
    expect(screen.getByTestId('MyAccount-pending-user-routes')).toBeInTheDocument();
    expect(screen.queryByTestId('MyAccount-active-user-routes')).not.toBeInTheDocument();
  });

  it('should call push with correct paths after clicking on links', () => {
    const pushFn = jest.fn();
    setUp(defaultUserProfile, pushFn);

    fireEvent.click(screen.getByTestId('MyAccount-products-link'));
    testRouterPushCall(pushFn, 0, '/my-account/products', '?p=1');

    fireEvent.click(screen.getByTestId('MyAccount-sell-history-link'));
    testRouterPushCall(pushFn, 1, '/my-account/sell-history', '?p=1');

    fireEvent.click(screen.getByTestId('MyAccount-placed-orders-link'));
    testRouterPushCall(pushFn, 2, '/my-account/placed-orders', '?p=1');

    expect(pushFn).toHaveBeenCalledTimes(3);
  });
});
