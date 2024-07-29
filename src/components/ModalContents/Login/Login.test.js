import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Login from './Login';
import * as actions from '../../../store/actions/indexActions';
import { clickAtSubmitButton, renderAppPart } from '../../../shared/testUtility/testUtility';
import { ModalType } from '../../../shared/types/types';

const mockStore = configureMockStore([thunk]);
const defaultStore = mockStore({
  ui: {
    isFormLoading: false,
    formError: '',
  },
});
defaultStore.dispatch = jest.fn();

const setUp = () => {
  return {
    ...renderAppPart(<Login />, {
      store: defaultStore,
      withoutRouter: true,
    }),
    store: defaultStore,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  loginUser: (credentials) => credentials,
}));

describe('<Login />', () => {
  describe('check behaviour after link click', () => {
    it('should call setModal() after link click', () => {
      const { store } = setUp();
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId('Login-forgot-password-link'));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(ModalType.RESET_PASSWORD));
    });
  });

  describe('check form', () => {
    const testEmail = 'test@domain.com';
    const testPassword = 'password';

    it('should have empty input and focus on it by default', () => {
      setUp();
      const emailInput = screen.getByTestId('Login-email');
      const passwordInput = screen.getByTestId('Login-password');
      expect(emailInput).toHaveFocus();
      expect(emailInput.value).toEqual('');
      expect(passwordInput.value).toEqual('');
    });

    describe('should call', () => {
      it('should call loginUser() with given values after inputs submits and button click', async () => {
        const { store, container } = setUp();

        const emailInput = screen.getByTestId('Login-email');
        const passwordInput = screen.getByTestId('Login-password');

        const dataToPass = {
          email: testEmail,
          password: testPassword,
        };

        await waitFor(() => {
          fireEvent.change(emailInput, { target: { value: testEmail } });
        });
        await waitFor(() => {
          fireEvent.change(passwordInput, { target: { value: testPassword } });
        });
        expect(emailInput.value).toEqual(testEmail);
        expect(passwordInput.value).toEqual(testPassword);

        await clickAtSubmitButton(container);
        expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.loginUser(dataToPass));

        await waitFor(() => {
          fireEvent.submit(emailInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.loginUser(dataToPass));

        await waitFor(() => {
          fireEvent.submit(passwordInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(3, actions.loginUser(dataToPass));

        expect(store.dispatch).toHaveBeenCalledTimes(3);
      });

      it('should call loginUser() with given email and empty password', async () => {
        const { store, container } = setUp();

        const emailInput = screen.getByTestId('Login-email');

        const dataToPass = {
          email: testEmail,
          password: '',
        };

        await waitFor(() => {
          fireEvent.change(emailInput, { target: { value: testEmail } });
        });
        expect(emailInput.value).toEqual(testEmail);

        await clickAtSubmitButton(container);

        expect(store.dispatch).toHaveBeenCalledWith(actions.loginUser(dataToPass));
      });

      it('should call loginUser() with given password and empty email', async () => {
        const { store, container } = setUp();

        const passwordInput = screen.getByTestId('Login-password');

        const dataToPass = {
          email: '',
          password: testPassword,
        };

        await waitFor(() => {
          fireEvent.change(passwordInput, { target: { value: testPassword } });
        });
        expect(passwordInput.value).toEqual(testPassword);

        await clickAtSubmitButton(container);

        expect(store.dispatch).toHaveBeenCalledWith(actions.loginUser(dataToPass));
      });
    });

    describe('should NOT call', () => {
      it('should NOT call loginUser() if both inputs are empty', async () => {
        const { store, container } = setUp();
        await clickAtSubmitButton(container);
        expect(store.dispatch).not.toHaveBeenCalled();
      });
    });
  });
});
