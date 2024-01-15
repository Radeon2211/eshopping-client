import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ResetPassword from './ResetPassword';
import * as actions from '../../../store/actions/indexActions';
import { modalTypes } from '../../../shared/constants';
import { clickAtSubmitButton, renderAppPart } from '../../../shared/testUtility/testUtility';

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
    ...renderAppPart(<ResetPassword />, {
      store: defaultStore,
      withoutRouter: true,
    }),
    store: defaultStore,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  resetPassword: (email) => email,
}));

describe('<ResetPassword />', () => {
  describe('check behaviour after link click', () => {
    it('should call setModal() after link click', () => {
      const { store } = setUp();
      expect(store.dispatch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByText(/login/i));
      expect(store.dispatch).toHaveBeenCalledWith(actions.setModal(modalTypes.LOGIN));
    });
  });

  describe('check form', () => {
    it('should have empty input and focus on it by default', () => {
      setUp();
      const emailInput = screen.getByTestId('ResetPassword-email');
      expect(emailInput).toHaveFocus();
      expect(emailInput.value).toEqual('');
    });

    it('should call resetPassword() with given email after input submit and button click', async () => {
      const { store, container } = setUp();

      const emailInput = screen.getByTestId('ResetPassword-email');
      const testEmail = 'test@domain.com';

      await waitFor(() => {
        fireEvent.change(emailInput, { target: { value: testEmail } });
      });
      expect(emailInput.value).toEqual(testEmail);

      await clickAtSubmitButton(container);
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.resetPassword(testEmail));

      await waitFor(() => {
        fireEvent.submit(emailInput);
      });
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.resetPassword(testEmail));

      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('should NOT call resetPassword() if input is empty', async () => {
      const { store, container } = setUp();
      await clickAtSubmitButton(container);
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
