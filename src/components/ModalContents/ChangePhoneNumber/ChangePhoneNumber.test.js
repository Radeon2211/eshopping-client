import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import selectEvent from 'react-select-event';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ChangePhoneNumber from './ChangePhoneNumber';
import * as actions from '../../../store/actions/indexActions';
import {
  clickAtSubmitButton,
  defaultUserProfile,
  renderAppPart,
} from '../../../shared/testUtility/testUtility';

const oldPhonePrefixLabel = '+48 Poland';
const oldPhonePrefix = '+48';
const oldPhoneNumber = '123456789';

const mockStore = configureMockStore([thunk]);
const defaultStore = mockStore({
  auth: {
    profile: { ...defaultUserProfile, phone: `${oldPhonePrefix} ${oldPhoneNumber}` },
  },
  ui: {
    isFormLoading: false,
    formError: '',
  },
});
defaultStore.dispatch = jest.fn();

const setUp = () => {
  return {
    ...renderAppPart(<ChangePhoneNumber />, {
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

describe('<ChangePhoneNumber />', () => {
  describe('check form', () => {
    const updateMessage = 'Phone number has been changed successfully';
    const defaultNewPhonePrefix = '+51';
    const defaultNewPhonePrefixLabel = '+51 Peru';
    const defaultNewPhoneNumber = '987-654-321';
    const defaultNewPhone = '+51 987-654-321';

    it('should have values from state in inputs and focus on phoneNumber input by default', () => {
      setUp();
      const phoneNumberInput = screen.getByTestId('ChangePhoneNumber-phoneNumber');
      expect(phoneNumberInput).toHaveFocus();
      expect(phoneNumberInput.value).toEqual(oldPhoneNumber);
      expect(screen.getByText(oldPhonePrefixLabel)).toBeInTheDocument();
    });

    describe('should call', () => {
      it('should call updateUser() with given values after input submit and button click', async () => {
        const { store, container } = setUp();

        const phoneNumberInput = screen.getByTestId('ChangePhoneNumber-phoneNumber');

        const dataToPass = {
          phone: defaultNewPhone,
        };

        await waitFor(() => {
          fireEvent.change(phoneNumberInput, { target: { value: defaultNewPhoneNumber } });
        });
        await waitFor(async () => {
          await selectEvent.openMenu(screen.getByText(oldPhonePrefixLabel));
          fireEvent.click(screen.getByText(defaultNewPhonePrefixLabel));
        });
        expect(phoneNumberInput.value).toEqual(defaultNewPhoneNumber);
        expect(screen.getByText(defaultNewPhonePrefixLabel)).toBeInTheDocument();

        await clickAtSubmitButton(container);
        expect(store.dispatch).toHaveBeenNthCalledWith(
          1,
          actions.updateUser(dataToPass, updateMessage),
        );

        await waitFor(() => {
          fireEvent.submit(phoneNumberInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          2,
          actions.updateUser(dataToPass, updateMessage),
        );

        await waitFor(() => {
          fireEvent.submit(screen.getByText(defaultNewPhonePrefixLabel));
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          3,
          actions.updateUser(dataToPass, updateMessage),
        );

        expect(store.dispatch).toHaveBeenCalledTimes(3);
      });

      it('should call updateUser() with changed phoneNumber only', async () => {
        const { store, container } = setUp();

        const phoneNumberInput = screen.getByTestId('ChangePhoneNumber-phoneNumber');

        const dataToPass = {
          phone: `${oldPhonePrefix} ${defaultNewPhoneNumber}`,
        };

        await waitFor(() => {
          fireEvent.change(phoneNumberInput, { target: { value: defaultNewPhoneNumber } });
        });
        expect(phoneNumberInput.value).toEqual(defaultNewPhoneNumber);

        await clickAtSubmitButton(container);

        expect(store.dispatch).toHaveBeenCalledWith(actions.updateUser(dataToPass, updateMessage));
      });

      it('should call updateUser() with changed phonePrefix only', async () => {
        const { store, container } = setUp();

        const dataToPass = {
          phone: `${defaultNewPhonePrefix} ${oldPhoneNumber}`,
        };

        await waitFor(async () => {
          await selectEvent.openMenu(screen.getByText(oldPhonePrefixLabel));
          fireEvent.click(screen.getByText(defaultNewPhonePrefixLabel));
        });
        expect(screen.getByText(defaultNewPhonePrefixLabel)).toBeInTheDocument();

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

      it('should NOT call updateUser() if phoneNumber is too short', async () => {
        const { store, container } = setUp();

        const phoneNumberInput = screen.getByTestId('ChangePhoneNumber-phoneNumber');
        const newPhoneNumber = '1234';

        await waitFor(() => {
          fireEvent.change(phoneNumberInput, { target: { value: newPhoneNumber } });
        });
        expect(phoneNumberInput.value).toEqual(newPhoneNumber);

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call updateUser() if phoneNumber is too long', async () => {
        const { store, container } = setUp();

        const phoneNumberInput = screen.getByTestId('ChangePhoneNumber-phoneNumber');
        const newPhoneNumber = '123-456-789-123-2';

        await waitFor(() => {
          fireEvent.change(phoneNumberInput, { target: { value: newPhoneNumber } });
        });
        expect(phoneNumberInput.value).toEqual(newPhoneNumber);

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call updateUser() if phoneNumber also has other characters than numbers and dashes', async () => {
        const { store, container } = setUp();

        const phoneNumberInput = screen.getByTestId('ChangePhoneNumber-phoneNumber');
        const newPhoneNumber = '123 456 789';

        await waitFor(() => {
          fireEvent.change(phoneNumberInput, { target: { value: newPhoneNumber } });
        });
        expect(phoneNumberInput.value).toEqual(newPhoneNumber);

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });
    });
  });
});
