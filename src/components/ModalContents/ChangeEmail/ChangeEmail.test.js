import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ChangeEmail from './ChangeEmail';
import {
  clickAtSubmitButton,
  defaultUserProfile,
  renderAppPart,
} from '../../../shared/testUtility/testUtility';
import * as actions from '../../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const oldEmail = 'old@domain.com';

const defaultStore = mockStore({
  auth: {
    profile: { ...defaultUserProfile, email: oldEmail },
  },
  ui: {
    isFormLoading: false,
    formError: '',
  },
});
defaultStore.dispatch = jest.fn();

const setUp = () => {
  return {
    ...renderAppPart(<ChangeEmail />, {
      store: defaultStore,
      withoutRouter: true,
    }),
    store: defaultStore,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  changeEmail: (credentials) => credentials,
}));

describe('<ChangeEmail />', () => {
  describe('check form', () => {
    const defaultNewEmail = 'new@domain.com';
    const currentPassword = 'password';

    it('should have empty inputs and focus on email input by default', () => {
      setUp();
      const emailInput = screen.getByTestId('ChangeEmail-email');
      const currentPasswordInput = screen.getByTestId('ChangeEmail-current-password');
      expect(emailInput).toHaveFocus();
      expect(emailInput.value).toEqual('');
      expect(currentPasswordInput.value).toEqual('');
    });

    describe('should call', () => {
      it('should call changeEmail() with given credentials after input submit and button click', async () => {
        const { store, container } = setUp();

        const emailInput = screen.getByTestId('ChangeEmail-email');
        const currentPasswordInput = screen.getByTestId('ChangeEmail-current-password');

        const dataToPass = {
          email: defaultNewEmail,
          currentPassword,
        };

        await waitFor(() => {
          fireEvent.change(emailInput, { target: { value: defaultNewEmail } });
        });
        await waitFor(() => {
          fireEvent.change(currentPasswordInput, { target: { value: currentPassword } });
        });
        expect(emailInput.value).toEqual(defaultNewEmail);
        expect(currentPasswordInput.value).toEqual(currentPassword);

        await clickAtSubmitButton(container);
        expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.changeEmail(dataToPass));

        await waitFor(() => {
          fireEvent.submit(emailInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.changeEmail(dataToPass));

        expect(store.dispatch).toHaveBeenCalledTimes(2);
      });
    });

    describe('should NOT call', () => {
      it('should NOT call changeEmail() if both inputs are empty', async () => {
        const { store, container } = setUp();
        await clickAtSubmitButton(container);
        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call changeEmail() if current password input is empty (email is valid)', async () => {
        const { store, container } = setUp();

        const emailInput = screen.getByTestId('ChangeEmail-email');

        await waitFor(() => {
          fireEvent.change(emailInput, { target: { value: defaultNewEmail } });
        });
        expect(emailInput.value).toEqual(defaultNewEmail);

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call changeEmail() if email input is empty (password is given)', async () => {
        const { store, container } = setUp();

        const currentPasswordInput = screen.getByTestId('ChangeEmail-current-password');

        await waitFor(() => {
          fireEvent.change(currentPasswordInput, { target: { value: currentPassword } });
        });
        expect(currentPasswordInput.value).toEqual(currentPassword);

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call changeEmail() if email is invalid (password is given)', async () => {
        const { store, container } = setUp();

        const emailInput = screen.getByTestId('ChangeEmail-email');
        const currentPasswordInput = screen.getByTestId('ChangeEmail-current-password');

        const newEmail = 'invalidemail';

        await waitFor(() => {
          fireEvent.change(emailInput, { target: { value: newEmail } });
        });
        await waitFor(() => {
          fireEvent.change(currentPasswordInput, { target: { value: currentPassword } });
        });
        expect(emailInput.value).toEqual(newEmail);
        expect(currentPasswordInput.value).toEqual(currentPassword);

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call changeEmail() if email is the same as current email (password is given)', async () => {
        const { store, container } = setUp();

        const emailInput = screen.getByTestId('ChangeEmail-email');
        const currentPasswordInput = screen.getByTestId('ChangeEmail-current-password');

        await waitFor(() => {
          fireEvent.change(emailInput, { target: { value: oldEmail } });
        });
        await waitFor(() => {
          fireEvent.change(currentPasswordInput, { target: { value: currentPassword } });
        });
        expect(emailInput.value).toEqual(oldEmail);
        expect(currentPasswordInput.value).toEqual(currentPassword);

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });
    });
  });
});
