import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import MyAccount from './MyAccount';
import theme from '../../styled/theme';
import { defaultUserProfile } from '../../shared/testUtility';

const mockStore = configureMockStore([thunk]);

const setUp = (userProfile, pushFn = jest.fn()) => {
  const store = mockStore({
    auth: { profile: userProfile },
  });

  const history = {
    listen: jest.fn(),
    createHref: jest.fn(),
    location: { pathname: '/my-account/data' },
    push: pushFn,
  };

  return render(
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <MyAccount />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

afterEach(cleanup);

describe('<MyAccount />', () => {
  it('Should render navigation and all routes', () => {
    setUp(defaultUserProfile);
    expect(screen.getByTestId('MyAccount-navigation')).toBeInTheDocument();
    expect(screen.queryByTestId('MyAccount-pending-user-routes')).not.toBeInTheDocument();
    expect(screen.getByTestId('MyAccount-active-user-routes')).toBeInTheDocument();
  });

  it('Should NOT render navigation and render only one route if user has status pending', () => {
    setUp({ ...defaultUserProfile, status: 'pending' });
    expect(screen.queryByTestId('MyAccount-navigation')).not.toBeInTheDocument();
    expect(screen.getByTestId('MyAccount-pending-user-routes')).toBeInTheDocument();
    expect(screen.queryByTestId('MyAccount-active-user-routes')).not.toBeInTheDocument();
  });

  it('Should call push with correct paths after clicking on links', () => {
    const pushFn = jest.fn();
    setUp(defaultUserProfile, pushFn);

    fireEvent.click(screen.getByText('Data'));
    expect(pushFn.mock.calls[0][0].pathname).toEqual('/my-account/data');

    fireEvent.click(screen.getByText('Products'));
    expect(pushFn.mock.calls[1][0].pathname).toEqual(`/my-account/products`);
    expect(pushFn.mock.calls[1][0].search).toEqual('?p=1');

    fireEvent.click(screen.getByText('Sell history'));
    expect(pushFn.mock.calls[2][0].pathname).toEqual('/my-account/sell-history');
    expect(pushFn.mock.calls[2][0].search).toEqual('?p=1');

    fireEvent.click(screen.getByText('Placed orders'));
    expect(pushFn.mock.calls[3][0].pathname).toEqual('/my-account/placed-orders');
    expect(pushFn.mock.calls[3][0].search).toEqual('?p=1');

    expect(pushFn).toHaveBeenCalledTimes(4);
  });
});
