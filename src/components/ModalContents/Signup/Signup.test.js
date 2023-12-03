import React from 'react';
import {
  render,
  cleanup,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import selectEvent from 'react-select-event';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Signup from './Signup';
import theme from '../../../styled/theme';
import { clickAtSubmitButton } from '../../../shared/testUtility/testUtility';
import * as actions from '../../../store/actions/indexActions';

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
          <Signup />
        </ThemeProvider>
      </Provider>,
    ),
    store,
  };
};

jest.mock('../../../store/actions/indexActions.js', () => ({
  ...jest.requireActual('../../../store/actions/indexActions.js'),
  registerUser: (data) => data,
}));

const defaultNewEmail = 'john@domain.com';
const defaultNewUsername = 'john';
const defaultNewPassword = 'password';
const defaultNewFirstName = 'John';
const defaultNewLastName = 'Stuart';
const defaultNewPhonePrefixLabel = '+44 United Kingdom';
const defaultNewPhoneNumber = '123-456-789';
const defaultNewPhone = '+44 123-456-789';
const defaultNewStreet = 'Woodhouse 17';
const defaultNewZipCode = 'LS1-LS29';
const defaultNewCity = 'Leeds';
const defaultNewCountry = 'United Kingdom';
const defaultNewContacts = {
  phone: false,
  email: false,
};

const defaultDataToPass = {
  email: defaultNewEmail,
  username: defaultNewUsername,
  password: defaultNewPassword,
  firstName: defaultNewFirstName,
  lastName: defaultNewLastName,
  city: defaultNewCity,
  zipCode: defaultNewZipCode,
  country: defaultNewCountry,
  street: defaultNewStreet,
  phone: defaultNewPhone,
  contacts: defaultNewContacts,
};

const fillEmail = async (value = defaultNewEmail) => {
  const emailInput = screen.getByTestId('Step1-email');
  await waitFor(() => {
    fireEvent.input(emailInput, { target: { value } });
  });
};

const clickHideEmail = async () => {
  const hideEmailCheckbox = screen.getByTestId('Step1-hideEmail');
  await waitFor(() => {
    fireEvent.click(hideEmailCheckbox);
  });
};

const fillUsername = async (value = defaultNewUsername) => {
  const usernameInput = screen.getByTestId('Step1-username');
  await waitFor(() => {
    fireEvent.input(usernameInput, { target: { value } });
  });
};

const fillPassword = async (value = defaultNewPassword) => {
  const passwordInput = screen.getByTestId('Step1-password');
  await waitFor(() => {
    fireEvent.input(passwordInput, { target: { value } });
  });
};

const fillFirstName = async (value = defaultNewFirstName) => {
  const firstNameInput = screen.getByTestId('Step2-firstName');
  await waitFor(() => {
    fireEvent.input(firstNameInput, { target: { value } });
  });
};

const fillLastName = async (value = defaultNewLastName) => {
  const lastNameInput = screen.getByTestId('Step2-lastName');
  await waitFor(() => {
    fireEvent.input(lastNameInput, { target: { value } });
  });
};

const choosePhonePrefix = async (label = defaultNewPhonePrefixLabel) => {
  await selectEvent.openMenu(screen.getByText(/choose your phone number prefix/i));
  await waitFor(() => {
    fireEvent.click(screen.getByText(label));
  });
};

const fillPhoneNumber = async (value = defaultNewPhoneNumber) => {
  const phoneNumberInput = screen.getByTestId('Step2-phoneNumber');
  await waitFor(() => {
    fireEvent.input(phoneNumberInput, { target: { value } });
  });
};

const clickHidePhone = async () => {
  const hidePhoneCheckbox = screen.getByTestId('Step2-hidePhone');
  await waitFor(() => {
    fireEvent.click(hidePhoneCheckbox);
  });
};

const fillStreet = async (value = defaultNewStreet) => {
  const streetInput = screen.getByTestId('Step3-street');
  await waitFor(() => {
    fireEvent.input(streetInput, { target: { value } });
  });
};

const fillZipCode = async (value = defaultNewZipCode) => {
  const zipCodeInput = screen.getByTestId('Step3-zipCode');
  await waitFor(() => {
    fireEvent.input(zipCodeInput, { target: { value } });
  });
};

const fillCity = async (value = defaultNewCity) => {
  const cityInput = screen.getByTestId('Step3-city');
  await waitFor(() => {
    fireEvent.input(cityInput, { target: { value } });
  });
};

const chooseCountry = async (label = defaultNewCountry) => {
  await selectEvent.openMenu(screen.getByText(/choose your country/i));
  await waitFor(() => {
    fireEvent.click(screen.getByText(label));
  });
};

const goToStep2 = async () => {
  await waitFor(() => {
    fireEvent.click(screen.getByTestId('Step1-next-btn'));
  });
};

const goToStep3 = async () => {
  await waitFor(() => {
    fireEvent.click(screen.getByTestId('Step2-next-btn'));
  });
};

const fillStep1 = async (goToNext = false) => {
  await fillEmail();
  await clickHideEmail();
  await fillUsername();
  await fillPassword();
  if (goToNext) {
    await goToStep2();
  }
};

const fillStep2 = async (goToNext = false) => {
  await fillFirstName();
  await fillLastName();
  await choosePhonePrefix();
  await fillPhoneNumber();
  await clickHidePhone();
  if (goToNext) {
    await goToStep3();
  }
};

const fillStep3 = async (submit = false, container) => {
  await fillStreet();
  await fillZipCode();
  await fillCity();
  await chooseCountry();
  if (submit) {
    await clickAtSubmitButton(container);
  }
};

const fillEntireForm = async (submit = false, container) => {
  await fillStep1(true);
  await fillStep2(true);
  await fillStep3(submit, container);
};

afterEach(cleanup);

describe('<Signup />', () => {
  describe('check form', () => {
    const defaultEmail = '';
    const defaultUsername = '';
    const defaultPassword = '';
    const defaultFirstName = '';
    const defaultLastName = '';
    const defaultPhoneNumber = '';
    const defaultStreet = '';
    const defaultZipCode = '';
    const defaultCity = '';

    it('tests default values, focus and values after change', async () => {
      setUp();
      // Step1
      const emailInput = screen.getByTestId('Step1-email');
      const hideEmailCheckbox = screen.getByTestId('Step1-hideEmail');
      const usernameInput = screen.getByTestId('Step1-username');
      const passwordInput = screen.getByTestId('Step1-password');

      expect(emailInput).toHaveFocus();
      expect(emailInput.value).toEqual(defaultEmail);
      expect(hideEmailCheckbox).not.toBeChecked();
      expect(usernameInput.value).toEqual(defaultUsername);
      expect(passwordInput.value).toEqual(defaultPassword);

      await fillStep1();

      expect(emailInput.value).toEqual(defaultNewEmail);
      expect(hideEmailCheckbox).toBeChecked();
      expect(usernameInput.value).toEqual(defaultNewUsername);
      expect(passwordInput.value).toEqual(defaultNewPassword);

      await waitFor(() => {
        fireEvent.click(screen.getByTestId('Step1-next-btn'));
      });

      // Step2
      const firstNameInput = screen.getByTestId('Step2-firstName');
      const lastNameInput = screen.getByTestId('Step2-lastName');
      const phoneNumberInput = screen.getByTestId('Step2-phoneNumber');
      const hidePhoneCheckbox = screen.getByTestId('Step2-hidePhone');

      expect(firstNameInput).toHaveFocus();
      expect(firstNameInput.value).toEqual(defaultFirstName);
      expect(lastNameInput.value).toEqual(defaultLastName);
      expect(screen.getByText(/choose your phone number prefix/i)).toBeInTheDocument();
      expect(phoneNumberInput.value).toEqual(defaultPhoneNumber);
      expect(hidePhoneCheckbox).not.toBeChecked();

      await fillStep2();

      expect(firstNameInput.value).toEqual(defaultNewFirstName);
      expect(lastNameInput.value).toEqual(defaultNewLastName);
      expect(phoneNumberInput.value).toEqual(defaultNewPhoneNumber);
      expect(screen.getByText(defaultNewPhonePrefixLabel)).toBeInTheDocument();
      expect(hidePhoneCheckbox).toBeChecked();

      fireEvent.click(screen.getByTestId('Step2-next-btn'));

      // Step3
      const streetInput = screen.getByTestId('Step3-street');
      const zipCodeInput = screen.getByTestId('Step3-zipCode');
      const cityInput = screen.getByTestId('Step3-city');

      expect(streetInput).toHaveFocus();
      expect(streetInput.value).toEqual(defaultStreet);
      expect(zipCodeInput.value).toEqual(defaultZipCode);
      expect(screen.getByText(/choose your country/i)).toBeInTheDocument();
      expect(cityInput.value).toEqual(defaultCity);

      await fillStep3();

      expect(streetInput.value).toEqual(defaultNewStreet);
      expect(zipCodeInput.value).toEqual(defaultNewZipCode);
      expect(cityInput.value).toEqual(defaultNewCity);
      expect(screen.getByText(defaultNewCountry)).toBeInTheDocument();
    });

    it('should go back to Step1 from Step3', async () => {
      setUp();

      await fillEntireForm();
      await waitForElementToBeRemoved(screen.queryByTestId('Step2'));
      expect(screen.queryByTestId('Step1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('Step2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('Step3')).toBeInTheDocument();

      await waitFor(() => {
        fireEvent.click(screen.getByTestId('Step3-previous-btn'));
      });
      await waitForElementToBeRemoved(screen.queryByTestId('Step3'));
      expect(screen.queryByTestId('Step1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('Step2')).toBeInTheDocument();
      expect(screen.queryByTestId('Step3')).not.toBeInTheDocument();

      await waitFor(() => {
        fireEvent.click(screen.getByTestId('Step2-previous-btn'));
      });
      await waitForElementToBeRemoved(screen.queryByTestId('Step2'));
      expect(screen.queryByTestId('Step1')).toBeInTheDocument();
      expect(screen.queryByTestId('Step2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('Step3')).not.toBeInTheDocument();
    });

    describe('should call', () => {
      it('should call registerUser() with default new values after Step3 inputs submits and button click', async () => {
        const { store, container } = setUp();

        await fillEntireForm(true, container);
        expect(store.dispatch).toHaveBeenNthCalledWith(1, actions.registerUser(defaultDataToPass));

        const streetInput = screen.getByTestId('Step3-street');
        const zipCodeInput = screen.getByTestId('Step3-zipCode');
        const cityInput = screen.getByTestId('Step3-city');
        const countryInput = screen.getByText(defaultNewCountry);

        await waitFor(() => {
          fireEvent.submit(streetInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(2, actions.registerUser(defaultDataToPass));

        await waitFor(() => {
          fireEvent.submit(zipCodeInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(3, actions.registerUser(defaultDataToPass));

        await waitFor(() => {
          fireEvent.submit(cityInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(4, actions.registerUser(defaultDataToPass));

        await waitFor(() => {
          fireEvent.submit(countryInput);
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(5, actions.registerUser(defaultDataToPass));

        expect(store.dispatch).toHaveBeenCalledTimes(5);
      });

      describe('test values length and correctness', () => {
        describe('email', () => {
          it('should call registerUser() with longest possible email', async () => {
            const { store, container } = setUp();

            let newEmail = '';
            for (let i = 1; i <= 314; i += 1) {
              newEmail += 'e';
            }
            newEmail += '@wp.pl';
            const dataToPass = {
              ...defaultDataToPass,
              email: newEmail,
            };

            await fillStep1();
            await fillEmail(newEmail);
            await goToStep2();
            await fillStep2(true);
            await fillStep3(true, container);

            expect(store.dispatch).toHaveBeenCalledWith(actions.registerUser(dataToPass));
          });
        });

        describe('username', () => {
          it('should call registerUser() with shortest possible username', async () => {
            const { store, container } = setUp();

            const newUsername = 'max';
            const dataToPass = {
              ...defaultDataToPass,
              username: newUsername,
            };

            await fillStep1();
            await fillUsername(newUsername);
            await goToStep2();
            await fillStep2(true);
            await fillStep3(true, container);

            expect(store.dispatch).toHaveBeenCalledWith(actions.registerUser(dataToPass));
          });

          it('should call registerUser() with longest possible username', async () => {
            const { store, container } = setUp();

            let newUsername = '';
            for (let i = 1; i <= 20; i += 1) {
              newUsername += 'e';
            }
            const dataToPass = {
              ...defaultDataToPass,
              username: newUsername,
            };

            await fillStep1();
            await fillUsername(newUsername);
            await goToStep2();
            await fillStep2(true);
            await fillStep3(true, container);

            expect(store.dispatch).toHaveBeenCalledWith(actions.registerUser(dataToPass));
          });
        });

        describe('password', () => {
          it('should call registerUser() with shortest possible password', async () => {
            const { store, container } = setUp();

            let newPassword = '';
            for (let i = 1; i <= 7; i += 1) {
              newPassword += 'e';
            }
            const dataToPass = {
              ...defaultDataToPass,
              password: newPassword,
            };

            await fillStep1();
            await fillPassword(newPassword);
            await goToStep2();
            await fillStep2(true);
            await fillStep3(true, container);

            expect(store.dispatch).toHaveBeenCalledWith(actions.registerUser(dataToPass));
          });

          it('should call registerUser() with longest possible password', async () => {
            const { store, container } = setUp();

            let newPassword = '';
            for (let i = 1; i <= 64; i += 1) {
              newPassword += 'e';
            }
            const dataToPass = {
              ...defaultDataToPass,
              password: newPassword,
            };

            await fillStep1();
            await fillPassword(newPassword);
            await goToStep2();
            await fillStep2(true);
            await fillStep3(true, container);

            expect(store.dispatch).toHaveBeenCalledWith(actions.registerUser(dataToPass));
          });
        });

        describe('firstName and lastName', () => {
          it('should call registerUser() with longest possible firstName', async () => {
            const { store, container } = setUp();

            let newFirstName = '';
            for (let i = 1; i <= 60; i += 1) {
              newFirstName += 'e';
            }
            const dataToPass = {
              ...defaultDataToPass,
              firstName: newFirstName,
            };

            await fillStep1(true);
            await fillStep2();
            await fillFirstName(newFirstName);
            await goToStep3();
            await fillStep3(true, container);

            expect(store.dispatch).toHaveBeenCalledWith(actions.registerUser(dataToPass));
          });

          it('should call registerUser() with longest possible lastName', async () => {
            const { store, container } = setUp();

            let newLastName = '';
            for (let i = 1; i <= 80; i += 1) {
              newLastName += 'e';
            }
            const dataToPass = {
              ...defaultDataToPass,
              lastName: newLastName,
            };

            await fillStep1(true);
            await fillStep2();
            await fillLastName(newLastName);
            await goToStep3();
            await fillStep3(true, container);

            expect(store.dispatch).toHaveBeenCalledWith(actions.registerUser(dataToPass));
          });
        });

        describe('phoneNumber', () => {
          it('should call registerUser() with shortest possible phoneNumber', async () => {
            const { store, container } = setUp();

            let newPhoneNumber = '';
            for (let i = 1; i <= 5; i += 1) {
              newPhoneNumber += '1';
            }
            const dataToPass = {
              ...defaultDataToPass,
              phone: `+44 ${newPhoneNumber}`,
            };

            await fillStep1(true);
            await fillStep2();
            await fillPhoneNumber(newPhoneNumber);
            await goToStep3();
            await fillStep3(true, container);

            expect(store.dispatch).toHaveBeenCalledWith(actions.registerUser(dataToPass));
          });

          it('should call registerUser() with longest possible phoneNumber', async () => {
            const { store, container } = setUp();

            let newPhoneNumber = '';
            for (let i = 1; i <= 15; i += 1) {
              newPhoneNumber += '1';
            }
            const dataToPass = {
              ...defaultDataToPass,
              phone: `+44 ${newPhoneNumber}`,
            };

            await fillStep1(true);
            await fillStep2();
            await fillPhoneNumber(newPhoneNumber);
            await goToStep3();
            await fillStep3(true, container);

            expect(store.dispatch).toHaveBeenCalledWith(actions.registerUser(dataToPass));
          });
        });

        describe('street, zipCode, city, country', () => {
          it('should call registerUser() with longest possible street', async () => {
            const { store, container } = setUp();

            let newStreet = '';
            for (let i = 1; i <= 60; i += 1) {
              newStreet += 'e';
            }
            const dataToPass = {
              ...defaultDataToPass,
              street: newStreet,
            };

            await fillStep1(true);
            await fillStep2(true);
            await fillStep3();
            await fillStreet(newStreet);
            await clickAtSubmitButton(container);

            expect(store.dispatch).toHaveBeenCalledWith(actions.registerUser(dataToPass));
          });

          it('should call registerUser() with longest possible zipCode', async () => {
            const { store, container } = setUp();

            const newZipCode = '111-222-3333';
            const dataToPass = {
              ...defaultDataToPass,
              zipCode: newZipCode,
            };

            await fillStep1(true);
            await fillStep2(true);
            await fillStep3();
            await fillZipCode(newZipCode);
            await clickAtSubmitButton(container);

            expect(store.dispatch).toHaveBeenCalledWith(actions.registerUser(dataToPass));
          });

          it('should call registerUser() with longest possible city', async () => {
            const { store, container } = setUp();

            let newCity = '';
            for (let i = 1; i <= 100; i += 1) {
              newCity += 'e';
            }
            const dataToPass = {
              ...defaultDataToPass,
              city: newCity,
            };

            await fillStep1(true);
            await fillStep2(true);
            await fillStep3();
            await fillCity(newCity);
            await clickAtSubmitButton(container);

            expect(store.dispatch).toHaveBeenCalledWith(actions.registerUser(dataToPass));
          });
        });

        describe('hideEmail and hidePhone', () => {
          it('should call registerUser() with NOT checked hideEmail', async () => {
            const { store, container } = setUp();

            const dataToPass = {
              ...defaultDataToPass,
              contacts: {
                email: true,
                phone: false,
              },
            };

            await fillStep1();
            await clickHideEmail();
            await goToStep2();
            await fillStep2(true);
            await fillStep3(true, container);

            expect(store.dispatch).toHaveBeenCalledWith(actions.registerUser(dataToPass));
          });

          it('should call registerUser() with NOT checked hidePhone', async () => {
            const { store, container } = setUp();

            const dataToPass = {
              ...defaultDataToPass,
              contacts: {
                email: false,
                phone: true,
              },
            };

            await fillStep1(true);
            await fillStep2();
            await clickHidePhone();
            await goToStep3();
            await fillStep3(true, container);

            expect(store.dispatch).toHaveBeenCalledWith(actions.registerUser(dataToPass));
          });

          it('should call registerUser() with NOT checked hidePhone and hideEmail', async () => {
            const { store, container } = setUp();

            const dataToPass = {
              ...defaultDataToPass,
              contacts: {
                email: true,
                phone: true,
              },
            };

            await fillStep1();
            await clickHideEmail();
            await goToStep2();
            await fillStep2();
            await clickHidePhone();
            await goToStep3();
            await fillStep3(true, container);

            expect(store.dispatch).toHaveBeenCalledWith(actions.registerUser(dataToPass));
          });
        });
      });
    });

    describe('should NOT call', () => {
      describe('test values length and correctness', () => {
        describe('email', () => {
          it('should NOT go to Step2 with empty email', async () => {
            const { store } = setUp();

            await fillStep1();
            await fillUsername('');
            await goToStep2();
            expect(screen.queryByTestId('Step2')).not.toBeInTheDocument();

            expect(store.dispatch).not.toHaveBeenCalled();
          });

          it('should NOT go to Step2 with invalid email', async () => {
            const { store } = setUp();

            await fillStep1();
            await fillEmail('invalidemail');
            await goToStep2();
            expect(screen.queryByTestId('Step2')).not.toBeInTheDocument();

            expect(store.dispatch).not.toHaveBeenCalled();
          });
        });

        describe('username', () => {
          it('should NOT go to Step2 with empty username', async () => {
            const { store } = setUp();

            await fillStep1();
            await fillUsername('');
            await goToStep2();
            expect(screen.queryByTestId('Step2')).not.toBeInTheDocument();

            expect(store.dispatch).not.toHaveBeenCalled();
          });

          it('should NOT go to Step2 with too short username', async () => {
            const { store } = setUp();

            await fillStep1();
            await fillUsername('xi');
            await goToStep2();
            expect(screen.queryByTestId('Step2')).not.toBeInTheDocument();

            expect(store.dispatch).not.toHaveBeenCalled();
          });

          it('should NOT go to Step2 with too long username', async () => {
            const { store } = setUp();

            let newUsername = '';
            for (let i = 1; i <= 21; i += 1) {
              newUsername += 'e';
            }

            await fillStep1();
            await fillUsername(newUsername);
            await goToStep2();
            expect(screen.queryByTestId('Step2')).not.toBeInTheDocument();

            expect(store.dispatch).not.toHaveBeenCalled();
          });
        });

        describe('password', () => {
          it('should NOT go to Step2 with empty password', async () => {
            const { store } = setUp();

            await fillStep1();
            await fillPassword('');
            await goToStep2();
            expect(screen.queryByTestId('Step2')).not.toBeInTheDocument();

            expect(store.dispatch).not.toHaveBeenCalled();
          });

          it('should NOT go to Step2 with too short password', async () => {
            const { store } = setUp();

            let newPassword = '';
            for (let i = 1; i <= 6; i += 1) {
              newPassword += 'e';
            }

            await fillStep1();
            await fillPassword(newPassword);
            await goToStep2();
            expect(screen.queryByTestId('Step2')).not.toBeInTheDocument();

            expect(store.dispatch).not.toHaveBeenCalled();
          });

          it('should NOT go to Step2 with too long password', async () => {
            const { store } = setUp();

            let newPassword = '';
            for (let i = 1; i <= 65; i += 1) {
              newPassword += 'e';
            }

            await fillStep1();
            await fillPassword(newPassword);
            await goToStep2();
            expect(screen.queryByTestId('Step2')).not.toBeInTheDocument();

            expect(store.dispatch).not.toHaveBeenCalled();
          });
        });

        describe('firstName and lastName', () => {
          it('should NOT go to Step3 with empty firstName', async () => {
            const { store } = setUp();

            await fillStep1(true);
            await fillStep2();
            await fillFirstName('');
            await goToStep3();

            expect(screen.queryByTestId('Step3')).not.toBeInTheDocument();

            expect(store.dispatch).not.toHaveBeenCalled();
          });

          it('should NOT go to Step3 with too long firstName', async () => {
            const { store } = setUp();

            let newFirstName = '';
            for (let i = 1; i <= 61; i += 1) {
              newFirstName += 'e';
            }

            await fillStep1(true);
            await fillStep2();
            await fillFirstName(newFirstName);
            await goToStep3();
            expect(screen.queryByTestId('Step3')).not.toBeInTheDocument();

            expect(store.dispatch).not.toHaveBeenCalled();
          });

          it('should NOT go to Step3 with empty lastName', async () => {
            const { store } = setUp();

            await fillStep1(true);
            await fillStep2();
            await fillLastName('');
            await goToStep3();
            expect(screen.queryByTestId('Step3')).not.toBeInTheDocument();

            expect(store.dispatch).not.toHaveBeenCalled();
          });

          it('should NOT go to Step3 with longest possible lastName', async () => {
            const { store } = setUp();

            let newLastName = '';
            for (let i = 1; i <= 81; i += 1) {
              newLastName += 'e';
            }

            await fillStep1(true);
            await fillStep2();
            await fillLastName(newLastName);
            await goToStep3();
            expect(screen.queryByTestId('Step3')).not.toBeInTheDocument();

            expect(store.dispatch).not.toHaveBeenCalled();
          });
        });

        describe('phonePrefix', () => {
          it('should NOT go to Step3 with empty phonePrefix', async () => {
            const { store } = setUp();

            await fillStep1(true);
            await fillFirstName();
            await fillLastName();
            await fillPhoneNumber();
            await goToStep3();

            expect(screen.queryByTestId('Step3')).not.toBeInTheDocument();

            expect(store.dispatch).not.toHaveBeenCalled();
          });
        });

        describe('phoneNumber', () => {
          it('should NOT go to Step3 with empty phoneNumber', async () => {
            const { store } = setUp();

            await fillStep1(true);
            await fillStep2();
            await fillPhoneNumber('');
            await goToStep3();

            expect(screen.queryByTestId('Step3')).not.toBeInTheDocument();

            expect(store.dispatch).not.toHaveBeenCalled();
          });

          it('should NOT go to Step3 with too short phoneNumber', async () => {
            const { store } = setUp();

            let newPhoneNumber = '';
            for (let i = 1; i <= 4; i += 1) {
              newPhoneNumber += '1';
            }

            await fillStep1(true);
            await fillStep2();
            await fillPhoneNumber(newPhoneNumber);
            await goToStep3();
            expect(screen.queryByTestId('Step3')).not.toBeInTheDocument();

            expect(store.dispatch).not.toHaveBeenCalled();
          });

          it('should NOT go to Step3 with too long phoneNumber', async () => {
            const { store } = setUp();

            let newPhoneNumber = '';
            for (let i = 1; i <= 16; i += 1) {
              newPhoneNumber += '1';
            }

            await fillStep1(true);
            await fillStep2();
            await fillPhoneNumber(newPhoneNumber);
            await goToStep3();
            expect(screen.queryByTestId('Step3')).not.toBeInTheDocument();

            expect(store.dispatch).not.toHaveBeenCalled();
          });

          it('should NOT go to Step3 with invalid phoneNumber', async () => {
            const { store } = setUp();

            await fillStep1(true);
            await fillStep2();
            await fillPhoneNumber('123 456 789');
            await goToStep3();
            expect(screen.queryByTestId('Step3')).not.toBeInTheDocument();

            expect(store.dispatch).not.toHaveBeenCalled();
          });
        });

        describe('street, zipCode, city, country', () => {
          it('should NOT call registerUser() with empty street', async () => {
            const { store, container } = setUp();

            await fillEntireForm();
            await fillStreet('');
            await clickAtSubmitButton(container);

            expect(store.dispatch).not.toHaveBeenCalled();
          });

          it('should NOT call registerUser() with too long street', async () => {
            const { store, container } = setUp();

            let newStreet = '';
            for (let i = 1; i <= 61; i += 1) {
              newStreet += 'e';
            }

            await fillEntireForm();
            await fillStreet(newStreet);
            await clickAtSubmitButton(container);

            expect(store.dispatch).not.toHaveBeenCalled();
          });

          it('should NOT call registerUser() with empty zipCode', async () => {
            const { store, container } = setUp();

            await fillEntireForm();
            await fillZipCode('');
            await clickAtSubmitButton(container);

            expect(store.dispatch).not.toHaveBeenCalled();
          });

          it('should NOT call registerUser() with too long zipCode', async () => {
            const { store, container } = setUp();

            await fillEntireForm();
            await fillZipCode('111-222-333-2');
            await clickAtSubmitButton(container);

            expect(store.dispatch).not.toHaveBeenCalled();
          });

          it('should NOT call registerUser() with empty city', async () => {
            const { store, container } = setUp();

            await fillEntireForm();
            await fillCity('');
            await clickAtSubmitButton(container);

            expect(store.dispatch).not.toHaveBeenCalled();
          });

          it('should NOT call registerUser() with too long city', async () => {
            const { store, container } = setUp();

            let newCity = '';
            for (let i = 1; i <= 101; i += 1) {
              newCity += 'e';
            }

            await fillEntireForm();
            await fillCity(newCity);
            await clickAtSubmitButton(container);

            expect(store.dispatch).not.toHaveBeenCalled();
          });
        });

        describe('country', () => {
          it('should NOT call registerUser() with empty country', async () => {
            const { store, container } = setUp();

            await fillStep1(true);
            await fillStep2(true);
            await fillStreet();
            await fillZipCode();
            await fillCity();
            await clickAtSubmitButton(container);

            expect(store.dispatch).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
});
