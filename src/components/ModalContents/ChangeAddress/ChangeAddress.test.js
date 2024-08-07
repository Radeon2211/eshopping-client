import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import selectEvent from 'react-select-event';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ChangeAddress from './ChangeAddress';
import {
  clickAtSubmitButton,
  defaultUserProfile,
  renderAppPart,
} from '../../../shared/testUtility/testUtility';
import * as actions from '../../../store/actions/indexActions';

const mockStore = configureMockStore([thunk]);

const oldStreet = 'Szkolna 17';
const oldZipCode = '15-950';
const oldCity = 'Białystok';
const oldCountry = 'Poland';

const setUp = () => {
  const store = mockStore({
    auth: {
      profile: {
        ...defaultUserProfile,
        street: oldStreet,
        zipCode: oldZipCode,
        city: oldCity,
        country: oldCountry,
      },
    },
    ui: {
      isFormLoading: false,
      formError: '',
    },
  });
  store.dispatch = jest.fn();

  return {
    ...renderAppPart(<ChangeAddress />, {
      store,
      withoutRouter: true,
    }),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.ts', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.ts'),
  updateUser: (credentials, message) => ({
    credentials,
    message,
  }),
}));

describe('<ChangeAddress />', () => {
  describe('check form', () => {
    const defaultNewStreet = 'Woodhouse 17';
    const defaultNewZipCode = 'LS1-LS29';
    const defaultNewCity = 'Leeds';
    const defaultNewCountry = 'United Kingdom';

    it('should have values from state in inputs and focus on street input by default', () => {
      setUp();
      const streetInput = screen.getByTestId('ChangeAddress-street');
      const zipCodeInput = screen.getByTestId('ChangeAddress-zipCode');
      const cityInput = screen.getByTestId('ChangeAddress-city');
      expect(streetInput).toHaveFocus();
      expect(streetInput.value).toEqual(oldStreet);
      expect(zipCodeInput.value).toEqual(oldZipCode);
      expect(cityInput.value).toEqual(oldCity);
      expect(screen.getByText(oldCountry)).toBeInTheDocument();
    });

    describe('should call', () => {
      const updateMessage = 'Address has been changed successfully';

      it('should call updateUser() with all changed values after inputs submit and button click', async () => {
        const { store, container } = setUp();

        const streetInput = screen.getByTestId('ChangeAddress-street');
        const zipCodeInput = screen.getByTestId('ChangeAddress-zipCode');
        const cityInput = screen.getByTestId('ChangeAddress-city');

        const dataToPass = {
          street: defaultNewStreet,
          zipCode: defaultNewZipCode,
          city: defaultNewCity,
          country: defaultNewCountry,
        };

        await waitFor(() => {
          fireEvent.change(streetInput, { target: { value: defaultNewStreet } });
        });
        await waitFor(() => {
          fireEvent.change(zipCodeInput, { target: { value: defaultNewZipCode } });
        });
        await waitFor(() => {
          fireEvent.change(cityInput, { target: { value: defaultNewCity } });
        });
        await waitFor(async () => {
          await selectEvent.openMenu(screen.getAllByText(oldCountry)[0]);
          fireEvent.click(screen.getByText(defaultNewCountry));
        });
        expect(streetInput.value).toEqual(defaultNewStreet);
        expect(zipCodeInput.value).toEqual(defaultNewZipCode);
        expect(cityInput.value).toEqual(defaultNewCity);
        expect(screen.getByText(defaultNewCountry)).toBeInTheDocument();

        await clickAtSubmitButton(container);
        expect(store.dispatch).toHaveBeenNthCalledWith(
          1,
          actions.updateUser(dataToPass, updateMessage),
        );

        await waitFor(() => {
          fireEvent.submit(streetInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          2,
          actions.updateUser(dataToPass, updateMessage),
        );

        await waitFor(() => {
          fireEvent.submit(zipCodeInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          3,
          actions.updateUser(dataToPass, updateMessage),
        );

        await waitFor(() => {
          fireEvent.submit(cityInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          4,
          actions.updateUser(dataToPass, updateMessage),
        );

        await waitFor(() => {
          fireEvent.submit(screen.getByText(defaultNewCountry));
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          5,
          actions.updateUser(dataToPass, updateMessage),
        );

        expect(store.dispatch).toHaveBeenCalledTimes(5);
      });

      describe('single change', () => {
        it('should call updateUser() with changed street only', async () => {
          const { store, container } = setUp();

          const streetInput = screen.getByTestId('ChangeAddress-street');
          const dataToPass = {
            street: defaultNewStreet,
          };

          await waitFor(() => {
            fireEvent.change(streetInput, { target: { value: defaultNewStreet } });
          });
          expect(streetInput.value).toEqual(defaultNewStreet);

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(
            actions.updateUser(dataToPass, updateMessage),
          );
        });

        it('should call updateUser() with changed zipCode only', async () => {
          const { store, container } = setUp();

          const zipCodeInput = screen.getByTestId('ChangeAddress-zipCode');
          const dataToPass = {
            zipCode: defaultNewZipCode,
          };

          await waitFor(() => {
            fireEvent.change(zipCodeInput, { target: { value: defaultNewZipCode } });
          });
          expect(zipCodeInput.value).toEqual(defaultNewZipCode);

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(
            actions.updateUser(dataToPass, updateMessage),
          );
        });

        it('should call updateUser() with changed city only', async () => {
          const { store, container } = setUp();

          const cityInput = screen.getByTestId('ChangeAddress-city');
          const dataToPass = {
            city: defaultNewCity,
          };

          await waitFor(() => {
            fireEvent.change(cityInput, { target: { value: defaultNewCity } });
          });
          expect(cityInput.value).toEqual(defaultNewCity);

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(
            actions.updateUser(dataToPass, updateMessage),
          );
        });

        it('should call updateUser() with changed country only', async () => {
          const { store, container } = setUp();
          const dataToPass = {
            country: defaultNewCountry,
          };

          await waitFor(async () => {
            await selectEvent.openMenu(screen.getAllByText(oldCountry)[0]);
            fireEvent.click(screen.getByText(defaultNewCountry));
          });
          expect(screen.getByText(defaultNewCountry)).toBeInTheDocument();

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(
            actions.updateUser(dataToPass, updateMessage),
          );
        });
      });
    });

    describe('should NOT call', () => {
      it('should NOT call updateUser() if all inputs have old values', async () => {
        const { store, container } = setUp();
        await clickAtSubmitButton(container);
        expect(store.dispatch).not.toHaveBeenCalled();
      });

      describe('inputs are empty', () => {
        it('should NOT call updateUser() if street input is empty', async () => {
          const { store, container } = setUp();
          const streetInput = screen.getByTestId('ChangeAddress-street');

          await waitFor(() => {
            fireEvent.change(streetInput, { target: { value: '' } });
          });
          expect(streetInput.value).toEqual('');

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call updateUser() if zipCode input is empty', async () => {
          const { store, container } = setUp();
          const zipCodeInput = screen.getByTestId('ChangeAddress-zipCode');

          await waitFor(() => {
            fireEvent.change(zipCodeInput, { target: { value: '' } });
          });
          expect(zipCodeInput.value).toEqual('');

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call updateUser() if city input is empty', async () => {
          const { store, container } = setUp();
          const cityInput = screen.getByTestId('ChangeAddress-city');

          await waitFor(() => {
            fireEvent.change(cityInput, { target: { value: '' } });
          });
          expect(cityInput.value).toEqual('');

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });
      });

      describe('values are too long', () => {
        it('should NOT call updateUser() if street is too long', async () => {
          const { store, container } = setUp();
          const streetInput = screen.getByTestId('ChangeAddress-street');

          let newStreet = '';
          for (let i = 1; i <= 61; i += 1) {
            newStreet += 'e';
          }
          await waitFor(() => {
            fireEvent.change(streetInput, { target: { value: newStreet } });
          });
          expect(streetInput.value).toEqual(newStreet);

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call updateUser() if zipCode is too long', async () => {
          const { store, container } = setUp();
          const zipCodeInput = screen.getByTestId('ChangeAddress-zipCode');

          let newZipCode = '';
          for (let i = 1; i <= 13; i += 1) {
            newZipCode += '7';
          }
          await waitFor(() => {
            fireEvent.change(zipCodeInput, { target: { value: newZipCode } });
          });
          expect(zipCodeInput.value).toEqual(newZipCode);

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });

        it('should NOT call updateUser() if city is too long', async () => {
          const { store, container } = setUp();
          const cityInput = screen.getByTestId('ChangeAddress-city');

          let newCity = '';
          for (let i = 1; i <= 101; i += 1) {
            newCity += 'e';
          }
          await waitFor(() => {
            fireEvent.change(cityInput, { target: { value: newCity } });
          });
          expect(cityInput.value).toEqual(newCity);

          await clickAtSubmitButton(container);

          expect(store.dispatch).not.toHaveBeenCalled();
        });
      });
    });
  });
});
