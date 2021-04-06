import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ChangeContacts from './ChangeContacts';
import theme from '../../../styled/theme';
import * as actions from '../../../store/actions/indexActions';
import { clickAtSubmitButton, defaultUserProfile } from '../../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);

const setUp = () => {
  const store = mockStore({
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
  store.dispatch = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ChangeContacts />
        </ThemeProvider>
      </Provider>,
    ),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  updateUser: (credentials, message) => ({
    credentials,
    message,
  }),
}));

afterEach(cleanup);

describe('<ChangeContacts />', () => {
  describe('check how renders', () => {
    it('should render everything correctly', () => {
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });
  });

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
          fireEvent.click(screen.getByText('Hide my email address from others'));
        });
        await waitFor(() => {
          fireEvent.click(screen.getByText('Hide my phone number from others'));
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
