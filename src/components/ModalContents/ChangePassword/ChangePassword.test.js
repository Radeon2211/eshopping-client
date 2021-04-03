import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ChangePassword from './ChangePassword';
import theme from '../../../styled/theme';
import * as actions from '../../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const setUp = () => {
  const store = mockStore({
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
          <ChangePassword />
        </ThemeProvider>
      </Provider>,
    ),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  updateUser: (credentials) => credentials,
}));

afterEach(cleanup);

describe('<ChangePassword />', () => {
  describe('Check how renders', () => {
    it('should render everything correctly', () => {
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Check form', () => {
    const currentPassword = 'currentPassword';
    const defaultNewPassword = 'newPassword';

    it('should have empty inputs and focus on current input by default', () => {
      setUp();
      const currentPasswordInput = screen.getByTestId('ChangePassword-current-password');
      const newPasswordInput = screen.getByTestId('ChangePassword-password');
      expect(currentPasswordInput).toHaveFocus();
      expect(currentPasswordInput.value).toEqual('');
      expect(newPasswordInput.value).toEqual('');
    });

    describe('should update', () => {
      const updateMessage = 'Password has been changed successfully';

      it('should call updateUser() with given values after inputs submit and button click', async () => {
        const { store, container } = setUp();

        const currentPasswordInput = screen.getByTestId('ChangePassword-current-password');
        const newPasswordInput = screen.getByTestId('ChangePassword-password');

        const credentials = {
          currentPassword,
          password: defaultNewPassword,
        };

        await waitFor(() => {
          fireEvent.change(currentPasswordInput, { target: { value: currentPassword } });
        });
        await waitFor(() => {
          fireEvent.change(newPasswordInput, { target: { value: defaultNewPassword } });
        });
        expect(currentPasswordInput.value).toEqual(currentPassword);
        expect(newPasswordInput.value).toEqual(defaultNewPassword);

        await waitFor(() => {
          fireEvent.click(container.querySelector('button[type="submit"]'));
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          1,
          actions.updateUser(credentials, updateMessage),
        );

        await waitFor(() => {
          fireEvent.submit(currentPasswordInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          2,
          actions.updateUser(credentials, updateMessage),
        );

        await waitFor(() => {
          fireEvent.submit(newPasswordInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          3,
          actions.updateUser(credentials, updateMessage),
        );

        expect(store.dispatch).toHaveBeenCalledTimes(3);
      });
    });

    describe('should NOT update', () => {
      it('should NOT call updateUser() if both inputs are empty', async () => {
        const { store, container } = setUp();
        await waitFor(() => {
          fireEvent.click(container.querySelector('button[type="submit"]'));
        });
        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call updateUser() if currentPassword input is empty (new password is valid)', async () => {
        const { store, container } = setUp();

        const currentPasswordInput = screen.getByTestId('ChangePassword-current-password');
        const newPasswordInput = screen.getByTestId('ChangePassword-password');

        await waitFor(() => {
          fireEvent.change(currentPasswordInput, {
            target: { value: '' },
          });
        });
        await waitFor(() => {
          fireEvent.change(newPasswordInput, {
            target: { value: defaultNewPassword },
          });
        });
        expect(currentPasswordInput.value).toEqual('');
        expect(newPasswordInput.value).toEqual(defaultNewPassword);

        await waitFor(() => {
          fireEvent.click(container.querySelector('button[type="submit"]'));
        });

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call updateUser() if new password input is empty (currentPassword is given)', async () => {
        const { store, container } = setUp();

        const currentPasswordInput = screen.getByTestId('ChangePassword-current-password');
        const newPasswordInput = screen.getByTestId('ChangePassword-password');

        await waitFor(() => {
          fireEvent.change(currentPasswordInput, {
            target: { value: currentPassword },
          });
        });
        await waitFor(() => {
          fireEvent.change(newPasswordInput, {
            target: { value: '' },
          });
        });
        expect(currentPasswordInput.value).toEqual(currentPassword);
        expect(newPasswordInput.value).toEqual('');

        await waitFor(() => {
          fireEvent.click(container.querySelector('button[type="submit"]'));
        });

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call updateUser() if new password is too short (currentPassword is given)', async () => {
        const { store, container } = setUp();

        const currentPasswordInput = screen.getByTestId('ChangePassword-current-password');
        const newPasswordInput = screen.getByTestId('ChangePassword-password');

        const newPassword = 'sixsix';

        await waitFor(() => {
          fireEvent.change(currentPasswordInput, {
            target: { value: currentPassword },
          });
        });
        await waitFor(() => {
          fireEvent.change(newPasswordInput, {
            target: { value: newPassword },
          });
        });
        expect(currentPasswordInput.value).toEqual(currentPassword);
        expect(newPasswordInput.value).toEqual(newPassword);

        await waitFor(() => {
          fireEvent.click(container.querySelector('button[type="submit"]'));
        });

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call updateUser() if new password is too long (currentPassword is given)', async () => {
        const { store, container } = setUp();

        const currentPasswordInput = screen.getByTestId('ChangePassword-current-password');
        const newPasswordInput = screen.getByTestId('ChangePassword-password');

        let newPassword = '';
        for (let i = 1; i <= 65; i += 1) {
          newPassword += 'e';
        }

        await waitFor(() => {
          fireEvent.change(currentPasswordInput, {
            target: { value: currentPassword },
          });
        });
        await waitFor(() => {
          fireEvent.change(newPasswordInput, {
            target: { value: newPassword },
          });
        });
        expect(currentPasswordInput.value).toEqual(currentPassword);
        expect(newPasswordInput.value).toEqual(newPassword);

        await waitFor(() => {
          fireEvent.click(container.querySelector('button[type="submit"]'));
        });

        expect(store.dispatch).not.toHaveBeenCalled();
      });
    });
  });
});
