import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RemoveAdmin from './RemoveAdmin';
import * as actions from '../../../store/actions/indexActions';
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
    ...renderAppPart(<RemoveAdmin />, {
      store: defaultStore,
      withoutRouter: true,
    }),
    store: defaultStore,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  removeAdmin: (email) => email,
}));

describe('<RemoveAdmin />', () => {
  describe('check form', () => {
    it('should have empty input and focus on it by default', () => {
      setUp();
      const emailInput = screen.getByTestId('RemoveAdmin-email');
      expect(emailInput).toHaveFocus();
      expect(emailInput.value).toEqual('');
    });

    it('should call removeAdmin() with given email after input submit and button click', async () => {
      const { store, container } = setUp();
      const emailInput = screen.getByTestId('RemoveAdmin-email');
      const testEmail = 'test@domain.com';

      await waitFor(() => {
        fireEvent.change(emailInput, { target: { value: testEmail } });
      });
      expect(emailInput.value).toEqual(testEmail);

      await clickAtSubmitButton(container);
      expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.removeAdmin(testEmail));

      await clickAtSubmitButton(container);
      expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.removeAdmin(testEmail));

      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('should NOT call removeAdmin() if input is empty or email is not valid', async () => {
      const { store, container } = setUp();

      const emailInput = screen.getByTestId('RemoveAdmin-email');
      const testEmail = 'invalidemail';

      await clickAtSubmitButton(container);

      await waitFor(() => {
        fireEvent.change(emailInput, { target: { value: testEmail } });
      });
      expect(emailInput.value).toEqual(testEmail);

      await clickAtSubmitButton(container);

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
