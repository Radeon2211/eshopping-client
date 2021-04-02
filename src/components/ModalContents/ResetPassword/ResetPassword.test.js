import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ResetPassword from './ResetPassword';
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
          <ResetPassword />
        </ThemeProvider>
      </Provider>,
    ),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  resetPassword: (email) => email,
}));

afterEach(cleanup);

describe('<ResetPassword />', () => {
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
      fireEvent.click(screen.getByText('Login'));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(modalTypes.LOGIN));
    });
  });

  describe('Check form', () => {
    it('should call resetPassword() with given email after input submit and button click', async () => {
      const { store, container } = setUp();

      const emailInput = screen.getByTestId('ResetPassword-email');
      const testEmail = 'test@domain.com';

      expect(emailInput).toHaveFocus();

      await waitFor(() => {
        fireEvent.change(emailInput, { target: { value: testEmail } });
      });

      await waitFor(() => {
        fireEvent.click(container.querySelector('button[type="submit"]'));
      });
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.resetPassword(testEmail));

      await waitFor(() => {
        fireEvent.submit(emailInput);
      });
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.resetPassword(testEmail));
    });

    it('should NOT call resetPassword() if input is empty', async () => {
      const { store, container } = setUp();

      await waitFor(() => {
        fireEvent.click(container.querySelector('button[type="submit"]'));
      });

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
