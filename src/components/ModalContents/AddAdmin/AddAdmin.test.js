import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AddAdmin from './AddAdmin';
import theme from '../../../styled/theme';
import * as actions from '../../../store/actions/indexActions';
import { clickAtSubmitButton } from '../../../shared/testUtility/testUtility';

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
          <AddAdmin />
        </ThemeProvider>
      </Provider>,
    ),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  addAdmin: (email) => email,
}));

afterEach(cleanup);

describe('<AddAdmin />', () => {
  describe('check form', () => {
    it('should have empty input and focus on it by default', () => {
      setUp();
      const emailInput = screen.getByTestId('AddAdmin-email');
      expect(emailInput).toHaveFocus();
      expect(emailInput.value).toEqual('');
    });

    it('should call addAdmin() with given email after input submit and button click', async () => {
      const { store, container } = setUp();

      const emailInput = screen.getByTestId('AddAdmin-email');
      const testEmail = 'test@domain.com';

      await waitFor(() => {
        fireEvent.change(emailInput, { target: { value: testEmail } });
      });
      expect(emailInput.value).toEqual(testEmail);

      await clickAtSubmitButton(container);
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.addAdmin(testEmail));

      await waitFor(() => {
        fireEvent.submit(emailInput);
      });
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.addAdmin(testEmail));
    });

    it('should NOT call resetPassword() if input is empty', async () => {
      const { store, container } = setUp();
      await clickAtSubmitButton(container);
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should NOT call resetPassword() if email is not valid', async () => {
      const { store, container } = setUp();

      const emailInput = screen.getByTestId('AddAdmin-email');
      const testEmail = 'invalidemail';

      await waitFor(() => {
        fireEvent.change(emailInput, { target: { value: testEmail } });
      });
      expect(emailInput.value).toEqual(testEmail);

      await clickAtSubmitButton(container);

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
