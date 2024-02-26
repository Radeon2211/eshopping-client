import { screen, fireEvent, act, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent, { PointerEventsCheckLevel } from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoggedInLinks from './LoggedInLinks';
import { userStatuses } from '../../../shared/constants';
import { renderAppPart, testRouterPushCall } from '../../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);

const defaultStore = mockStore({
  auth: { cart: [] },
});

const setUp = (username, status, pushFn = jest.fn()) => {
  return {
    ...renderAppPart(<LoggedInLinks username={username} status={status} />, {
      push: pushFn,
      store: defaultStore,
    }),
    user: userEvent.setup({ pointerEventsCheck: PointerEventsCheckLevel.Never }),
  };
};

describe('<LoggedInLinks />', () => {
  describe('check how renders', () => {
    it('should render version for user with status active', () => {
      setUp('username', userStatuses.ACTIVE);
      expect(screen.getByTestId('LoggedInLinks-user-box')).toBeInTheDocument();
    });

    it('should render version for user with status pending', () => {
      setUp('username', userStatuses.PENDING);
      expect(screen.getByTestId('LoggedInLinks-my-account-link')).toBeInTheDocument();
    });

    it('should open <Dropdown /> after clicking at user box and close after clicking outside <Dropdown />', async () => {
      const { user } = setUp('username', userStatuses.ACTIVE);

      expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId('LoggedInLinks-user-box'));
      expect(screen.getByTestId('Dropdown')).toBeInTheDocument();

      await act(async () => {
        await user.click(document.body);
      });
      await waitForElementToBeRemoved(screen.queryByTestId('Dropdown'));
    });

    it('should not close <Dropdown /> after clicking at <Dropdown />', async () => {
      const { user } = setUp('username', userStatuses.ACTIVE);

      expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId('LoggedInLinks-user-box'));
      const dropdown = screen.getByTestId('Dropdown');
      expect(dropdown).toBeInTheDocument();

      await user.click(dropdown);
      expect(dropdown).toBeInTheDocument();
    });
  });

  it('should call push after clicking at link to settings', async () => {
    const pushFn = jest.fn();
    setUp('username', userStatuses.PENDING, pushFn);
    fireEvent.click(screen.getByTestId('LoggedInLinks-my-account-link'));
    testRouterPushCall(pushFn, 0, '/my-account/data');
  });
});
