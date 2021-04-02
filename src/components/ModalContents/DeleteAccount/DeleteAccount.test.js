import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DeleteAccount from './DeleteAccount';
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

  const history = {
    listen: jest.fn(),
    location: { pathname: '/my-account/data' },
  };

  return {
    ...render(
      <Router history={history}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <DeleteAccount />
          </ThemeProvider>
        </Provider>
      </Router>,
    ),
    store,
    history,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  deleteAccount: (credentials, currentHistory) => ({
    credentials,
    currentHistory,
  }),
}));

afterEach(cleanup);

describe('<DeleteAccount />', () => {
  describe('Check how renders', () => {
    it('should render everything correctly', () => {
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Check form', () => {
    it('should call deleteAccount() with given password after input submit and button click', async () => {
      const { store, history, container } = setUp();

      const passwordInput = screen.getByTestId('DeleteAccount-current-password');
      const testPassword = 'password';

      expect(passwordInput).toHaveFocus();

      await waitFor(() => {
        fireEvent.change(passwordInput, { target: { value: testPassword } });
      });

      await waitFor(() => {
        fireEvent.click(container.querySelector('button[type="submit"]'));
      });
      expect(store.dispatch).toHaveBeenNthCalledWith(
        1,
        actions.deleteAccount({ currentPassword: testPassword }, history),
      );

      await waitFor(() => {
        fireEvent.submit(passwordInput);
      });
      expect(store.dispatch).toHaveBeenNthCalledWith(
        2,
        actions.deleteAccount({ currentPassword: testPassword }, history),
      );

      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('should NOT call deleteAccount() if input is empty', async () => {
      const { store, container } = setUp();

      await waitFor(() => {
        fireEvent.click(container.querySelector('button[type="submit"]'));
      });

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
