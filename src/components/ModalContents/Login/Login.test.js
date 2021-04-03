import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Login from './Login';
import theme from '../../../styled/theme';
import * as actions from '../../../store/actions/indexActions';
import { modalTypes } from '../../../shared/constants';

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
          <Login />
        </ThemeProvider>
      </Provider>,
    ),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  loginUser: (credentials) => credentials,
}));

afterEach(cleanup);

describe('<Login />', () => {
  describe('Check how renders', () => {
    it('should render everything correctly', () => {
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Check behaviour after link click', () => {
    it('should call setModal() after link click', () => {
      const { store } = setUp();
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByText('Forgot password'));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(modalTypes.RESET_PASSWORD));
    });
  });

  describe('Check form', () => {
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

    describe('successful', () => {
      it('should call loginUser() with given values after inputs submits and button click', async () => {
        const { store, container } = setUp();

        const emailInput = screen.getByTestId('Login-email');
        const passwordInput = screen.getByTestId('Login-password');

        const credentials = {
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

        await waitFor(() => {
          fireEvent.click(container.querySelector('button[type="submit"]'));
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.loginUser(credentials));

        await waitFor(() => {
          fireEvent.submit(emailInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.loginUser(credentials));

        await waitFor(() => {
          fireEvent.submit(passwordInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(3, actions.loginUser(credentials));

        expect(store.dispatch).toHaveBeenCalledTimes(3);
      });

      it('should call loginUser() with given email and empty password', async () => {
        const { store, container } = setUp();

        const emailInput = screen.getByTestId('Login-email');

        const credentials = {
          email: testEmail,
          password: '',
        };

        await waitFor(() => {
          fireEvent.change(emailInput, { target: { value: testEmail } });
        });
        expect(emailInput.value).toEqual(testEmail);

        await waitFor(() => {
          fireEvent.click(container.querySelector('button[type="submit"]'));
        });

        expect(store.dispatch).toHaveBeenCalledWith(actions.loginUser(credentials));
      });

      it('should call loginUser() with given password and empty email', async () => {
        const { store, container } = setUp();

        const passwordInput = screen.getByTestId('Login-password');

        const credentials = {
          email: '',
          password: testPassword,
        };

        await waitFor(() => {
          fireEvent.change(passwordInput, { target: { value: testPassword } });
        });
        expect(passwordInput.value).toEqual(testPassword);

        await waitFor(() => {
          fireEvent.click(container.querySelector('button[type="submit"]'));
        });

        expect(store.dispatch).toHaveBeenCalledWith(actions.loginUser(credentials));
      });
    });

    describe('unsuccessful', () => {
      it('should NOT call loginUser() if both inputs are empty', async () => {
        const { store, container } = setUp();
        await waitFor(() => {
          fireEvent.click(container.querySelector('button[type="submit"]'));
        });
        expect(store.dispatch).not.toHaveBeenCalled();
      });
    });
  });
});
