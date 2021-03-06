import React from 'react';
import {
  render,
  cleanup,
  screen,
  fireEvent,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import theme from '../../../styled/theme';
import LoggedInLinks from './LoggedInLinks';
import { checkProps } from '../../../shared/testUtility/testUtility';
import { userStatuses } from '../../../shared/constants';

const mockStore = configureMockStore([thunk]);

const defaultStore = mockStore({
  auth: { cart: [] },
});

const setUp = (username, status) => {
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
            <LoggedInLinks username={username} status={status} />
          </ThemeProvider>
        </Provider>
      </Router>,
    ),
    history,
  };
};

afterEach(cleanup);

describe('<LoggedInLinks />', () => {
  describe('check prop types', () => {
    it('should NOT throw a warning if status is active', () => {
      const props = {
        username: 'username',
        status: userStatuses.ACTIVE,
      };
      expect(checkProps(LoggedInLinks, props)).toBeUndefined();
    });

    it('should NOT throw a warning if status is pending', () => {
      const props = {
        username: 'username',
        status: userStatuses.PENDING,
      };
      expect(checkProps(LoggedInLinks, props)).toBeUndefined();
    });

    it('should throw a warning if invalid status is passed', () => {
      const props = {
        username: 'username',
        status: 'invalid',
      };
      expect(checkProps(LoggedInLinks, props)).not.toBe(null);
    });

    it('should throw a warning if no props are passed', () => {
      expect(checkProps(LoggedInLinks, {})).not.toBe(null);
    });
  });

  describe('check how renders', () => {
    it('should render version for user with status active', () => {
      const { asFragment } = setUp('username', userStatuses.ACTIVE);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render version for user with status pending', () => {
      const { asFragment } = setUp('username', userStatuses.PENDING);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should open <Dropdown /> after clicking at user box and close after clicking outside <Dropdown />', async () => {
      setUp('username', userStatuses.ACTIVE);

      expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId('LoggedInLinks-user-box'));
      expect(screen.getByTestId('Dropdown')).toBeInTheDocument();

      act(() => {
        userEvent.click(document.body);
      });
      await waitForElementToBeRemoved(screen.queryByTestId('Dropdown'));
    });

    it('should not close <Dropdown /> after clicking at <Dropdown />', async () => {
      setUp('username', userStatuses.ACTIVE);

      expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId('LoggedInLinks-user-box'));
      const dropdown = screen.getByTestId('Dropdown');
      expect(dropdown).toBeInTheDocument();

      userEvent.click(dropdown);
      expect(dropdown).toBeInTheDocument();
    });
  });

  it('should call push after clicking at link to settings', async () => {
    const { history } = setUp('username', userStatuses.PENDING);
    fireEvent.click(screen.getByTestId('LoggedInLinks-my-account-link'));
    expect(history.push).toHaveBeenCalledWith('/my-account/data');
  });
});
