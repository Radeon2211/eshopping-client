import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ChangeName from './ChangeName';
import theme from '../../../styled/theme';
import { clickAtSubmitButton, defaultUserProfile } from '../../../shared/testUtility/testUtility';
import * as actions from '../../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const oldFirstName = 'oldFirstName';
const oldLastName = 'oldLastName';

const setUp = () => {
  const store = mockStore({
    auth: {
      profile: { ...defaultUserProfile, firstName: oldFirstName, lastName: oldLastName },
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
          <ChangeName />
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

describe('<ChangeName />', () => {
  describe('check how renders', () => {
    it('should render everything correctly', () => {
      const { asFragment } = setUp();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('check form', () => {
    const defaultNewFirstName = 'newFirstName';
    const defaultNewLastName = 'newLastName';

    it('should have values from state in inputs and focus on firstName input by default', () => {
      setUp();
      const firstNameInput = screen.getByTestId('ChangeName-firstName');
      const lastNameInput = screen.getByTestId('ChangeName-lastName');
      expect(firstNameInput).toHaveFocus();
      expect(firstNameInput.value).toEqual(oldFirstName);
      expect(lastNameInput.value).toEqual(oldLastName);
    });

    describe('should call', () => {
      const updateMessage = 'Name has been changed successfully';

      it('should call updateUser() with all changed values after inputs submit and button click', async () => {
        const { store, container } = setUp();

        const firstNameInput = screen.getByTestId('ChangeName-firstName');
        const lastNameInput = screen.getByTestId('ChangeName-lastName');

        const dataToPass = {
          firstName: defaultNewFirstName,
          lastName: defaultNewLastName,
        };

        await waitFor(() => {
          fireEvent.change(firstNameInput, { target: { value: defaultNewFirstName } });
        });
        await waitFor(() => {
          fireEvent.change(lastNameInput, { target: { value: defaultNewLastName } });
        });
        expect(firstNameInput.value).toEqual(defaultNewFirstName);
        expect(lastNameInput.value).toEqual(defaultNewLastName);

        await clickAtSubmitButton(container);
        expect(store.dispatch).toHaveBeenNthCalledWith(
          1,
          actions.updateUser(dataToPass, updateMessage),
        );

        await waitFor(() => {
          fireEvent.submit(firstNameInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          2,
          actions.updateUser(dataToPass, updateMessage),
        );

        await waitFor(() => {
          fireEvent.submit(lastNameInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          3,
          actions.updateUser(dataToPass, updateMessage),
        );

        expect(store.dispatch).toHaveBeenCalledTimes(3);
      });

      it('should call updateUser() with updated firstName only', async () => {
        const { store, container } = setUp();

        const firstNameInput = screen.getByTestId('ChangeName-firstName');

        const dataToPass = {
          firstName: defaultNewFirstName,
        };

        await waitFor(() => {
          fireEvent.change(screen.getByTestId('ChangeName-firstName'), {
            target: { value: defaultNewFirstName },
          });
        });
        expect(firstNameInput.value).toEqual(defaultNewFirstName);

        await clickAtSubmitButton(container);

        expect(store.dispatch).toHaveBeenCalledWith(actions.updateUser(dataToPass, updateMessage));
      });

      it('should call updateUser() with updated lastName only', async () => {
        const { store, container } = setUp();

        const lastNameInput = screen.getByTestId('ChangeName-lastName');

        const dataToPass = {
          lastName: defaultNewLastName,
        };

        await waitFor(() => {
          fireEvent.change(lastNameInput, {
            target: { value: defaultNewLastName },
          });
        });
        expect(lastNameInput.value).toEqual(defaultNewLastName);

        await clickAtSubmitButton(container);

        expect(store.dispatch).toHaveBeenCalledWith(actions.updateUser(dataToPass, updateMessage));
      });
    });

    describe('should NOT call', () => {
      it('should NOT call updateUser() if both inputs are empty', async () => {
        const { store, container } = setUp();

        const firstNameInput = screen.getByTestId('ChangeName-firstName');
        const lastNameInput = screen.getByTestId('ChangeName-lastName');

        await waitFor(() => {
          fireEvent.change(firstNameInput, {
            target: { value: '' },
          });
        });
        await waitFor(() => {
          fireEvent.change(lastNameInput, {
            target: { value: '' },
          });
        });
        expect(firstNameInput.value).toEqual('');
        expect(lastNameInput.value).toEqual('');

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call updateUser() if both values are the same as current', async () => {
        const { store, container } = setUp();
        await clickAtSubmitButton(container);
        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call updateUser() if firstName input is empty (lastName is changed)', async () => {
        const { store, container } = setUp();

        const firstNameInput = screen.getByTestId('ChangeName-firstName');
        const lastNameInput = screen.getByTestId('ChangeName-lastName');

        await waitFor(() => {
          fireEvent.change(firstNameInput, {
            target: { value: '' },
          });
        });
        await waitFor(() => {
          fireEvent.change(lastNameInput, {
            target: { value: defaultNewLastName },
          });
        });
        expect(firstNameInput.value).toEqual('');
        expect(lastNameInput.value).toEqual(defaultNewLastName);

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call updateUser() if lastName input is empty (firstName is changed)', async () => {
        const { store, container } = setUp();

        const firstNameInput = screen.getByTestId('ChangeName-firstName');
        const lastNameInput = screen.getByTestId('ChangeName-lastName');

        await waitFor(() => {
          fireEvent.change(screen.getByTestId('ChangeName-firstName'), {
            target: { value: defaultNewFirstName },
          });
        });
        await waitFor(() => {
          fireEvent.change(screen.getByTestId('ChangeName-lastName'), {
            target: { value: '' },
          });
        });
        expect(firstNameInput.value).toEqual(defaultNewFirstName);
        expect(lastNameInput.value).toEqual('');

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call updateUser() if firstName is too long', async () => {
        const { store, container } = setUp();

        const firstNameInput = screen.getByTestId('ChangeName-firstName');

        let newFirstName = '';
        for (let i = 1; i <= 61; i += 1) {
          newFirstName += 'e';
        }
        await waitFor(() => {
          fireEvent.change(firstNameInput, {
            target: { value: newFirstName },
          });
        });
        expect(firstNameInput.value).toEqual(newFirstName);

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call updateUser() if lastName is too long', async () => {
        const { store, container } = setUp();

        const lastNameInput = screen.getByTestId('ChangeName-lastName');

        let newLastName = '';
        for (let i = 1; i <= 81; i += 1) {
          newLastName += 'e';
        }
        await waitFor(() => {
          fireEvent.change(lastNameInput, {
            target: { value: newLastName },
          });
        });
        expect(lastNameInput.value).toEqual(newLastName);

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });
    });
  });
});
