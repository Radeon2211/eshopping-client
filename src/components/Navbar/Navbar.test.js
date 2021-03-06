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

const setUp = (userProfile) => {
  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/products', search: '?p=1' },
    push: jest.fn(),
  };

  return {
    ...render(
      <Router history={history}>
        <Provider store={defaultStore}>
          <ThemeProvider theme={theme}>
            <Navbar userProfile={userProfile} />
          </ThemeProvider>
        </Provider>
      </Router>,
    ),
    history,
  };
};

afterEach(cleanup);

describe('<Navbar />', () => {
  it('should render <LoggedInLinks /> if user is logged in', () => {
    const { asFragment } = setUp(defaultUserProfile);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render <LoggedOutLinks /> if user is logged out', () => {
    const { asFragment } = setUp(null);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call push after clicking at logo', () => {
    const { history } = setUp(null);
    fireEvent.click(screen.getByTestId('Navbar-header-link'));
    expect(history.push).toHaveBeenCalledWith(defaultAppPath);
  });
});
