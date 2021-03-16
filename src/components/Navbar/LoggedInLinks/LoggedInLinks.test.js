import React from 'react';
import { render, cleanup, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import theme from '../../../styled/theme';
import LoggedInLinks from './LoggedInLinks';
import { checkProps } from '../../../shared/testUtility';

const mockStore = configureMockStore([thunk]);

const defaultStore = mockStore({
  auth: { cart: [] },
});

const setUp = (username, status, pushFn) => {
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
          <LoggedInLinks username={username} status={status} />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

afterEach(cleanup);

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

    it('Should throw a warning if no props are passed', () => {
      expect(checkProps(LoggedInLinks, {})).not.toBe(null);
    });
  });

  describe('Check how renders', () => {
    it('Should render version for user with status active', () => {
      const { asFragment } = setUp('username', 'active');
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should render version for user with status pending', () => {
      const { asFragment } = setUp('username', 'pending');
      expect(asFragment()).toMatchSnapshot();
    });

    it('Should open <Dropdown /> after clicking at user box and close after clicking outside <Dropdown />', async () => {
      setUp('username', 'active');

      expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId('LoggedInLinks-user-box'));
      expect(screen.getByTestId('Dropdown')).toBeInTheDocument();

      act(() => {
        userEvent.click(document.body);
      });
      await waitFor(() => {
        expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument();
      });
    });

    it('Should not close <Dropdown /> after clicking at <Dropdown />', async () => {
      setUp('username', 'active');

      expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId('LoggedInLinks-user-box'));
      const dropdown = screen.getByTestId('Dropdown');
      expect(dropdown).toBeInTheDocument();

      userEvent.click(dropdown);
      expect(dropdown).toBeInTheDocument();
    });
  });

  it('Should call push after clicking at link to settings', async () => {
    const pushFn = jest.fn();
    setUp('username', 'pending', pushFn);

    fireEvent.click(screen.getByTestId('LoggedInLinks-my-account-link'));
    expect(pushFn).toHaveBeenCalledWith('/my-account/data');
    expect(pushFn).toHaveBeenCalledTimes(1);
  });
});
