import { screen, fireEvent, waitFor, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AddAdmin from './AddAdmin';
import * as actions from '../../../store/actions/indexActions';
import { clickAtSubmitButton, renderAppPart } from '../../../shared/testUtility/testUtility';

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
    ...(renderAppPart(<AddAdmin />, {
      store,
      withoutRouter: true,
    }) as ReturnType<typeof render>),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.ts', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.ts'),
  addAdmin: (email: string) => email,
}));

describe('<AddAdmin />', () => {
  describe('check form', () => {
    it('should have empty input and focus on it by default', () => {
      setUp();
      const emailInput = screen.getByTestId('AddAdmin-email');
      expect(emailInput).toHaveFocus();
      expect(emailInput).toHaveValue('');
    });

    it('should call addAdmin() with given email after input submit and button click', async () => {
      const { store, container } = setUp();

      const emailInput = screen.getByTestId('AddAdmin-email');
      const testEmail = 'test@domain.com';

      await waitFor(() => {
        fireEvent.change(emailInput, { target: { value: testEmail } });
      });
      expect(emailInput).toHaveValue(testEmail);

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
      expect(emailInput).toHaveValue(testEmail);

      await clickAtSubmitButton(container);

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
