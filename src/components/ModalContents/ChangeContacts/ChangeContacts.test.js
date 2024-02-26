import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ChangeContacts from './ChangeContacts';
import * as actions from '../../../store/actions/indexActions';
import {
  clickAtSubmitButton,
  defaultUserProfile,
  renderAppPart,
} from '../../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);

const defaultStore = mockStore({
  auth: {
    profile: {
      ...defaultUserProfile,
      contacts: {
        email: true,
        phone: false,
      },
    },
  },
  ui: {
    isFormLoading: false,
    formError: '',
  },
});
defaultStore.dispatch = jest.fn();

const setUp = () => {
  return {
    ...renderAppPart(<ChangeContacts />, {
      store: defaultStore,
      withoutRouter: true,
    }),
    store: defaultStore,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  updateUser: (credentials, message) => ({
    credentials,
    message,
  }),
}));

describe('<ChangeContacts />', () => {
  describe('check form', () => {
    it('should have values that correspons to state - profile.contacts', () => {
      setUp();
      const hideEmailCheckbox = screen.getByTestId('ChangeContacts-hideEmail');
      const hidePhoneCheckbox = screen.getByTestId('ChangeContacts-hidePhone');
      expect(hideEmailCheckbox).not.toBeChecked();
      expect(hidePhoneCheckbox).toBeChecked();
    });

    describe('should call', () => {
      const updateMessage = 'Contacts have been changed successfully';

      it('should call updateUser() with email false and phone true (by clicking at inputs) after inputs submits and button click', async () => {
        const { store, container } = setUp();

        const hideEmailCheckbox = screen.getByTestId('ChangeContacts-hideEmail');
        const hidePhoneCheckbox = screen.getByTestId('ChangeContacts-hidePhone');

        const dataToPass = {
          contacts: {
            email: false,
            phone: true,
          },
        };

        await waitFor(() => {
          fireEvent.click(hideEmailCheckbox);
        });
        await waitFor(() => {
          fireEvent.click(hidePhoneCheckbox);
        });
        expect(hideEmailCheckbox).toBeChecked();
        expect(hidePhoneCheckbox).not.toBeChecked();

        await clickAtSubmitButton(container);
        expect(store.dispatch).toHaveBeenNthCalledWith(
          1,
          actions.updateUser(dataToPass, updateMessage),
        );

        await waitFor(() => {
          fireEvent.submit(hideEmailCheckbox);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          2,
          actions.updateUser(dataToPass, updateMessage),
        );

        await waitFor(() => {
          fireEvent.submit(hidePhoneCheckbox);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          3,
          actions.updateUser(dataToPass, updateMessage),
        );

        expect(store.dispatch).toHaveBeenCalledTimes(3);
      });

      it('should call updateUser() with email false and phone true (by clicking at labels)', async () => {
        const { store, container } = setUp();

        const dataToPass = {
          contacts: {
            email: false,
            phone: true,
          },
        };

        await waitFor(() => {
          fireEvent.click(screen.getByText(/hide my email address from others/i));
        });
        await waitFor(() => {
          fireEvent.click(screen.getByText(/hide my phone number from others/i));
        });
        expect(screen.getByTestId('ChangeContacts-hideEmail')).toBeChecked();
        expect(screen.getByTestId('ChangeContacts-hidePhone')).not.toBeChecked();

        await clickAtSubmitButton(container);

        expect(store.dispatch).toHaveBeenCalledWith(actions.updateUser(dataToPass, updateMessage));
      });

      it('should call updateUser() with email true and phone true', async () => {
        const { store, container } = setUp();

        const hideEmailCheckbox = screen.getByTestId('ChangeContacts-hideEmail');

        const dataToPass = {
          contacts: {
            email: false,
            phone: false,
          },
        };

        await waitFor(() => {
          fireEvent.click(hideEmailCheckbox);
        });
        expect(hideEmailCheckbox).toBeChecked();

        await clickAtSubmitButton(container);

        expect(store.dispatch).toHaveBeenCalledWith(actions.updateUser(dataToPass, updateMessage));
      });

      it('should call updateUser() with email true and phone true', async () => {
        const { store, container } = setUp();

        const hidePhoneCheckbox = screen.getByTestId('ChangeContacts-hidePhone');

        const dataToPass = {
          contacts: {
            email: true,
            phone: true,
          },
        };

        await waitFor(() => {
          fireEvent.click(hidePhoneCheckbox);
        });
        expect(hidePhoneCheckbox).not.toBeChecked();

        await clickAtSubmitButton(container);

        expect(store.dispatch).toHaveBeenCalledWith(actions.updateUser(dataToPass, updateMessage));
      });
    });

    describe('should NOT call', () => {
      it('should NOT call updateUser() if both inputs have old values', async () => {
        const { store, container } = setUp();
        await clickAtSubmitButton(container);
        expect(store.dispatch).not.toHaveBeenCalled();
      });
    });
  });
});
