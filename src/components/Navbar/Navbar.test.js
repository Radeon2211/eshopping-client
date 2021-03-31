import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';

import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import theme from '../../styled/theme';
import Navbar from './Navbar';
import { defaultUserProfile } from '../../shared/testUtility/testUtility';
import { defaultAppPath } from '../../shared/constants';

const mockStore = configureMockStore([thunk]);

const defaultStore = mockStore({
  auth: { cart: [] },
});

const setUp = (props = {}, pushFn) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search: '?p=1' },
    push: pushFn,
  };

  return render(
    <Router history={history}>
      <Provider store={defaultStore}>
        <ThemeProvider theme={theme}>
          <Navbar {...props} />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

afterEach(cleanup);

describe('<Navbar />', () => {
  it('should render <LoggedInLinks /> if user is logged in', () => {
    const props = {
      userProfile: defaultUserProfile,
    };
    const { asFragment } = setUp(props);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render <LoggedOutLinks /> if user is logged out', () => {
    const { asFragment } = setUp();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call push after clicking at logo', () => {
    const pushFn = jest.fn();
    setUp({}, pushFn);

    fireEvent.click(screen.getByTestId('Navbar-header-link'));
    expect(pushFn).toHaveBeenCalledWith(defaultAppPath);
    expect(pushFn).toHaveBeenCalledTimes(1);
  });
});
