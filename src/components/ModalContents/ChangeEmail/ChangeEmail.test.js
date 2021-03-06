import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ChangeEmail from './ChangeEmail';
import theme from '../../../styled/theme';
import { clickAtSubmitButton, defaultUserProfile } from '../../../shared/testUtility/testUtility';
import * as actions from '../../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const oldEmail = 'old@domain.com';

const setUp = () => {
  const store = mockStore({
    auth: {
      profile: { ...defaultUserProfile, email: oldEmail },
    },
    ui: {
      isFormLoading: false,
      formError: '',
    },
  });
  store.dispatch = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ChangeEmail />
        </ThemeProvider>
      </Provider>,
    ),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  changeEmail: (credentials) => credentials,
}));

afterEach(cleanup);

describe('<ChangeEmail />', () => {
  describe('check how renders', () => {
    it('should render everything correctly', () => {
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });
  });

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
