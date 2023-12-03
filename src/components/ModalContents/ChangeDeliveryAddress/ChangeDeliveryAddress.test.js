import React from 'react';
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import selectEvent from 'react-select-event';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ChangeDeliveryAddress from './ChangeDeliveryAddress';
import theme from '../../../styled/theme';
import * as actions from '../../../store/actions/indexActions';
import { clickAtSubmitButton } from '../../../shared/testUtility/testUtility';

const mockStore = configureMockStore([thunk]);

const oldFirstName = 'Krzysztof';
const oldLastName = 'Kononowicz';
const oldStreet = 'Szkolna 17';
const oldZipCode = '15-950';
const oldCity = 'Białystok';
const oldCountry = 'Poland';
const oldPhone = '+48 123456789';
const oldPhoneNumber = '123456789';
const oldPhonePrefixValue = '48';
const oldPhonePrefixLabel = '+48 Poland';

const setUp = () => {
  const store = mockStore({
    auth: {
      deliveryAddress: {
        firstName: oldFirstName,
        lastName: oldLastName,
        street: oldStreet,
        zipCode: oldZipCode,
        city: oldCity,
        country: oldCountry,
        phone: oldPhone,
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
          <ChangeDeliveryAddress />
        </ThemeProvider>
      </Provider>,
    ),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  changeDeliveryAddress: (credentials) => credentials,
}));

afterEach(cleanup);

describe('<ChangeDeliveryAddress />', () => {
  describe('check form', () => {
    const defaultNewFirstName = 'Andrew';
    const defaultNewLastName = 'Neil';
    const defaultNewStreet = 'Woodhouse 17';
    const defaultNewZipCode = 'LS1-LS29';
    const defaultNewCity = 'Leeds';
    const defaultNewCountry = 'United Kingdom';
    const defaultNewPhone = '+44 987-654-321';
    const defaultNewPhoneNumber = '987-654-321';
    const defaultNewPhonePrefixValue = '44';
    const defaultNewPhonePrefixLabel = '+44 United Kingdom';

    it('should have values from state in inputs and focus on street input by default', () => {
      setUp();
      const firstNameInput = screen.getByTestId('ChangeDeliveryAddress-firstName');
      const lastNameInput = screen.getByTestId('ChangeDeliveryAddress-lastName');
      const cityInput = screen.getByTestId('ChangeDeliveryAddress-city');
      const streetInput = screen.getByTestId('ChangeDeliveryAddress-street');
      const zipCodeInput = screen.getByTestId('ChangeDeliveryAddress-zipCode');
      const phoneNumberInput = screen.getByTestId('ChangeDeliveryAddress-phoneNumber');
      const onlyCurrentOrdersInput = screen.getByTestId(
        'ChangeDeliveryAddress-only-current-orders',
      );

      expect(firstNameInput).toHaveFocus();
      expect(firstNameInput.value).toEqual(oldFirstName);
      expect(lastNameInput.value).toEqual(oldLastName);
      expect(streetInput.value).toEqual(oldStreet);
      expect(zipCodeInput.value).toEqual(oldZipCode);
      expect(cityInput.value).toEqual(oldCity);
      expect(phoneNumberInput.value).toEqual(oldPhoneNumber);
      expect(screen.getByText(oldCountry)).toBeInTheDocument();
      expect(screen.getByText(oldPhonePrefixLabel)).toBeInTheDocument();
      expect(onlyCurrentOrdersInput).not.toBeChecked();
    });

    describe('should call', () => {
      it('should call changeDeliveryAddress() with all changed values after inputs submit and button click', async () => {
        const { store, container } = setUp();

        const firstNameInput = screen.getByTestId('ChangeDeliveryAddress-firstName');
        const lastNameInput = screen.getByTestId('ChangeDeliveryAddress-lastName');
        const cityInput = screen.getByTestId('ChangeDeliveryAddress-city');
        const streetInput = screen.getByTestId('ChangeDeliveryAddress-street');
        const zipCodeInput = screen.getByTestId('ChangeDeliveryAddress-zipCode');
        const phoneNumberInput = screen.getByTestId('ChangeDeliveryAddress-phoneNumber');
        const onlyCurrentOrdersInput = screen.getByTestId(
          'ChangeDeliveryAddress-only-current-orders',
        );

        const dataToPass = {
          firstName: defaultNewFirstName,
          lastName: defaultNewLastName,
          street: defaultNewStreet,
          zipCode: defaultNewZipCode,
          city: defaultNewCity,
          country: defaultNewCountry,
          phone: defaultNewPhone,
          onlyCurrentOrders: true,
        };

        await waitFor(() => {
          fireEvent.change(firstNameInput, { target: { value: defaultNewFirstName } });
        });
        await waitFor(() => {
          fireEvent.change(lastNameInput, { target: { value: defaultNewLastName } });
        });
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
        await waitFor(async () => {
          await selectEvent.openMenu(screen.getAllByText(oldPhonePrefixLabel)[0]);
          fireEvent.click(screen.getByText(defaultNewPhonePrefixLabel));
        });
        await waitFor(() => {
          fireEvent.change(phoneNumberInput, { target: { value: defaultNewPhoneNumber } });
        });
        await waitFor(() => {
          fireEvent.click(onlyCurrentOrdersInput);
        });
        expect(firstNameInput.value).toEqual(defaultNewFirstName);
        expect(lastNameInput.value).toEqual(defaultNewLastName);
        expect(streetInput.value).toEqual(defaultNewStreet);
        expect(zipCodeInput.value).toEqual(defaultNewZipCode);
        expect(cityInput.value).toEqual(defaultNewCity);
        expect(screen.getAllByText(defaultNewCountry)[0]).toBeInTheDocument();
        expect(screen.getByText(defaultNewPhonePrefixLabel)).toBeInTheDocument();
        expect(phoneNumberInput.value).toEqual(defaultNewPhoneNumber);
        expect(onlyCurrentOrdersInput).toBeChecked();

        await clickAtSubmitButton(container);
        expect(store.dispatch).toHaveBeenNthCalledWith(
          1,
          actions.changeDeliveryAddress(dataToPass),
        );

        await waitFor(() => {
          fireEvent.submit(firstNameInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          2,
          actions.changeDeliveryAddress(dataToPass),
        );

        await waitFor(() => {
          fireEvent.submit(lastNameInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          3,
          actions.changeDeliveryAddress(dataToPass),
        );

        await waitFor(() => {
          fireEvent.submit(streetInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          4,
          actions.changeDeliveryAddress(dataToPass),
        );

        await waitFor(() => {
          fireEvent.submit(zipCodeInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          5,
          actions.changeDeliveryAddress(dataToPass),
        );

        await waitFor(() => {
          fireEvent.submit(cityInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          6,
          actions.changeDeliveryAddress(dataToPass),
        );

        await waitFor(() => {
          fireEvent.submit(screen.getByText(defaultNewCountry));
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          7,
          actions.changeDeliveryAddress(dataToPass),
        );

        await waitFor(() => {
          fireEvent.submit(screen.getByText(defaultNewPhonePrefixLabel));
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          8,
          actions.changeDeliveryAddress(dataToPass),
        );

        await waitFor(() => {
          fireEvent.submit(phoneNumberInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          9,
          actions.changeDeliveryAddress(dataToPass),
        );

        await waitFor(() => {
          fireEvent.submit(onlyCurrentOrdersInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(
          10,
          actions.changeDeliveryAddress(dataToPass),
        );

        expect(store.dispatch).toHaveBeenCalledTimes(10);
      });

      describe('single change', () => {
        it('should call changeDeliveryAddress() with changed firstName only', async () => {
          const { store, container } = setUp();

          const firstNameInput = screen.getByTestId('ChangeDeliveryAddress-firstName');
          const dataToPass = {
            firstName: defaultNewFirstName,
            onlyCurrentOrders: false,
          };

          await waitFor(() => {
            fireEvent.change(firstNameInput, { target: { value: defaultNewFirstName } });
          });
          expect(firstNameInput.value).toEqual(defaultNewFirstName);

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.changeDeliveryAddress(dataToPass));
        });

        it('should call changeDeliveryAddress() with changed lastName only', async () => {
          const { store, container } = setUp();

          const lastNameInput = screen.getByTestId('ChangeDeliveryAddress-lastName');
          const dataToPass = {
            lastName: defaultNewLastName,
            onlyCurrentOrders: false,
          };

          await waitFor(() => {
            fireEvent.change(lastNameInput, { target: { value: defaultNewLastName } });
          });
          expect(lastNameInput.value).toEqual(defaultNewLastName);

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.changeDeliveryAddress(dataToPass));
        });

        it('should call changeDeliveryAddress() with changed street only', async () => {
          const { store, container } = setUp();

          const streetInput = screen.getByTestId('ChangeDeliveryAddress-street');
          const dataToPass = {
            street: defaultNewStreet,
            onlyCurrentOrders: false,
          };

          await waitFor(() => {
            fireEvent.change(streetInput, { target: { value: defaultNewStreet } });
          });
          expect(streetInput.value).toEqual(defaultNewStreet);

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.changeDeliveryAddress(dataToPass));
        });

        it('should call changeDeliveryAddress() with changed zipCode only', async () => {
          const { store, container } = setUp();

          const zipCodeInput = screen.getByTestId('ChangeDeliveryAddress-zipCode');
          const dataToPass = {
            zipCode: defaultNewZipCode,
            onlyCurrentOrders: false,
          };

          await waitFor(() => {
            fireEvent.change(zipCodeInput, { target: { value: defaultNewZipCode } });
          });
          expect(zipCodeInput.value).toEqual(defaultNewZipCode);

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.changeDeliveryAddress(dataToPass));
        });

        it('should call changeDeliveryAddress() with changed city only', async () => {
          const { store, container } = setUp();

          const cityInput = screen.getByTestId('ChangeDeliveryAddress-city');
          const dataToPass = {
            city: defaultNewCity,
            onlyCurrentOrders: false,
          };

          await waitFor(() => {
            fireEvent.change(cityInput, { target: { value: defaultNewCity } });
          });
          expect(cityInput.value).toEqual(defaultNewCity);

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.changeDeliveryAddress(dataToPass));
        });

        it('should call changeDeliveryAddress() with changed country only', async () => {
          const { store, container } = setUp();
          const dataToPass = {
            country: defaultNewCountry,
            onlyCurrentOrders: false,
          };

          await waitFor(async () => {
            await selectEvent.openMenu(screen.getAllByText(oldCountry)[0]);
            fireEvent.click(screen.getByText(defaultNewCountry));
          });
          expect(screen.getByText(defaultNewCountry)).toBeInTheDocument();

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.changeDeliveryAddress(dataToPass));
        });

        it('should call changeDeliveryAddress() with changed phonePrefix only', async () => {
          const { store, container } = setUp();
          const dataToPass = {
            phone: `+${defaultNewPhonePrefixValue} ${oldPhoneNumber}`,
            onlyCurrentOrders: false,
          };

          await waitFor(async () => {
            await selectEvent.openMenu(screen.getAllByText(oldPhonePrefixLabel)[0]);
            fireEvent.click(screen.getByText(defaultNewPhonePrefixLabel));
          });
          expect(screen.getByText(defaultNewPhonePrefixLabel)).toBeInTheDocument();

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.changeDeliveryAddress(dataToPass));
        });

        it('should call changeDeliveryAddress() with changed phoneNumber only', async () => {
          const { store, container } = setUp();

          const phoneNumberInput = screen.getByTestId('ChangeDeliveryAddress-phoneNumber');
          const dataToPass = {
            phone: `+${oldPhonePrefixValue} ${defaultNewPhoneNumber}`,
            onlyCurrentOrders: false,
          };

          await waitFor(() => {
            fireEvent.change(phoneNumberInput, { target: { value: defaultNewPhoneNumber } });
          });
          expect(phoneNumberInput.value).toEqual(defaultNewPhoneNumber);

          await clickAtSubmitButton(container);

          expect(store.dispatch).toHaveBeenCalledWith(actions.changeDeliveryAddress(dataToPass));
        });
      });
    });
  });

  describe('should NOT call', () => {
    it('should NOT call changeDeliveryAddress() if all inputs have old values', async () => {
      const { store, container } = setUp();
      await clickAtSubmitButton(container);
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should NOT call changeDeliveryAddress() if only onlyCurrentOrder value changed', async () => {
      const { store, container } = setUp();
      const onlyCurrentOrdersInput = screen.getByTestId(
        'ChangeDeliveryAddress-only-current-orders',
      );

      await waitFor(() => {
        fireEvent.click(onlyCurrentOrdersInput);
      });
      expect(onlyCurrentOrdersInput).toBeChecked();

      await clickAtSubmitButton(container);

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    describe('inputs are empty', () => {
      it('should NOT call changeDeliveryAddress() if firstName input is empty', async () => {
        const { store, container } = setUp();
        const firstNameInput = screen.getByTestId('ChangeDeliveryAddress-firstName');

        await waitFor(() => {
          fireEvent.change(firstNameInput, { target: { value: '' } });
        });
        expect(firstNameInput.value).toEqual('');

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call changeDeliveryAddress() if lastName input is empty', async () => {
        const { store, container } = setUp();
        const lastNameInput = screen.getByTestId('ChangeDeliveryAddress-lastName');

        await waitFor(() => {
          fireEvent.change(lastNameInput, { target: { value: '' } });
        });
        expect(lastNameInput.value).toEqual('');

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call changeDeliveryAddress() if street input is empty', async () => {
        const { store, container } = setUp();
        const streetInput = screen.getByTestId('ChangeDeliveryAddress-street');

        await waitFor(() => {
          fireEvent.change(streetInput, { target: { value: '' } });
        });
        expect(streetInput.value).toEqual('');

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call changeDeliveryAddress() if zipCode input is empty', async () => {
        const { store, container } = setUp();
        const zipCodeInput = screen.getByTestId('ChangeDeliveryAddress-zipCode');

        await waitFor(() => {
          fireEvent.change(zipCodeInput, { target: { value: '' } });
        });
        expect(zipCodeInput.value).toEqual('');

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call changeDeliveryAddress() if city input is empty', async () => {
        const { store, container } = setUp();
        const cityInput = screen.getByTestId('ChangeDeliveryAddress-city');

        await waitFor(() => {
          fireEvent.change(cityInput, { target: { value: '' } });
        });
        expect(cityInput.value).toEqual('');

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call changeDeliveryAddress() if phoneNumber input is empty', async () => {
        const { store, container } = setUp();
        const phoneNumberInput = screen.getByTestId('ChangeDeliveryAddress-phoneNumber');

        await waitFor(() => {
          fireEvent.change(phoneNumberInput, { target: { value: '' } });
        });
        expect(phoneNumberInput.value).toEqual('');

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });
    });

    describe('values are too long or too short', () => {
      it('should NOT call changeDeliveryAddress() if firstName is too long', async () => {
        const { store, container } = setUp();
        const firstNameInput = screen.getByTestId('ChangeDeliveryAddress-firstName');

        let newFirstName = '';
        for (let i = 1; i <= 61; i += 1) {
          newFirstName += 'e';
        }
        await waitFor(() => {
          fireEvent.change(firstNameInput, { target: { value: newFirstName } });
        });
        expect(firstNameInput.value).toEqual(newFirstName);

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call changeDeliveryAddress() if lastName is too long', async () => {
        const { store, container } = setUp();
        const lastNameInput = screen.getByTestId('ChangeDeliveryAddress-lastName');

        let newLastName = '';
        for (let i = 1; i <= 81; i += 1) {
          newLastName += 'e';
        }
        await waitFor(() => {
          fireEvent.change(lastNameInput, { target: { value: newLastName } });
        });
        expect(lastNameInput.value).toEqual(newLastName);

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });

      it('should NOT call changeDeliveryAddress() if street is too long', async () => {
        const { store, container } = setUp();
        const streetInput = screen.getByTestId('ChangeDeliveryAddress-street');

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

      it('should NOT call changeDeliveryAddress() if zipCode is too long', async () => {
        const { store, container } = setUp();
        const zipCodeInput = screen.getByTestId('ChangeDeliveryAddress-zipCode');

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

      it('should NOT call changeDeliveryAddress() if city is too long', async () => {
        const { store, container } = setUp();
        const cityInput = screen.getByTestId('ChangeDeliveryAddress-city');

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

      it('should NOT call changeDeliveryAddress() if phoneNumber is too long or too short', async () => {
        const { store, container } = setUp();
        const phoneNumberInput = screen.getByTestId('ChangeDeliveryAddress-phoneNumber');

        let tooShortNewPhoneNumber = '';
        for (let i = 1; i <= 4; i += 1) {
          tooShortNewPhoneNumber += '1';
        }
        await waitFor(() => {
          fireEvent.change(phoneNumberInput, { target: { value: tooShortNewPhoneNumber } });
        });
        expect(phoneNumberInput.value).toEqual(tooShortNewPhoneNumber);

        await clickAtSubmitButton(container);

        let tooLongNewPhoneNumber = '';
        for (let i = 1; i <= 16; i += 1) {
          tooLongNewPhoneNumber += '1';
        }
        await waitFor(() => {
          fireEvent.change(phoneNumberInput, { target: { value: tooLongNewPhoneNumber } });
        });
        expect(phoneNumberInput.value).toEqual(tooLongNewPhoneNumber);

        await clickAtSubmitButton(container);

        expect(store.dispatch).not.toHaveBeenCalled();
      });
    });
  });
});
