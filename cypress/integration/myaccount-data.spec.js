import '@testing-library/cypress/add-commands';
import { modalTypes, singleInfoNames } from '../../src/shared/constants';
import { adminUser, activeUser } from '../fixtures/users';

const usedUser = adminUser;

const newData = {
  firstName: 'New',
  lastName: 'User',
  email: 'newuser@example.com',
  password: 'newPa$$w0rd',
  street: 'Merrion Way 11',
  zipCode: '35004',
  city: 'Leeds',
  country: 'United Kingdom',
  contacts: {
    email: !usedUser.contacts.email,
    phone: !usedUser.contacts.phone,
  },
  phone: '+44 111-222-3333',
  phoneNumber: '111-222-3333',
  phonePrefixLabel: '+44 United Kingdom',
};

const checkAccountData = (checkNewEmail = false) => {
  cy.findByTestId(`SingleInfo-${singleInfoNames.USERNAME}`)
    .findByText(usedUser.username)
    .should('exist');

  cy.findByTestId(`SingleInfo-${singleInfoNames.NAME}`)
    .findByText(`${newData.firstName} ${newData.lastName}`)
    .should('exist');

  cy.findByTestId(`SingleInfo-${singleInfoNames.EMAIL}`).then(($container) => {
    if (checkNewEmail) {
      cy.wrap($container).findByText(newData.email).should('exist');
    } else {
      cy.wrap($container).findByText(usedUser.email).should('exist');
    }
  });

  cy.findByTestId(`SingleInfo-${singleInfoNames.ADDRESS}`).within(() => {
    cy.findByText(newData.street).should('exist');
    cy.findByText(`${newData.zipCode} ${newData.city}`).should('exist');
    cy.findByText(newData.country).should('exist');
  });

  cy.findByTestId(`SingleInfo-${singleInfoNames.CONTACTS}`).then(($container) => {
    if (newData.contacts.email) {
      cy.wrap($container).findByText('Email: visible').should('exist');
    } else {
      cy.wrap($container).findByText('Email: hidden').should('exist');
    }
    if (newData.contacts.phone) {
      cy.wrap($container).findByText('Phone number: visible').should('exist');
    } else {
      cy.wrap($container).findByText('Phone number: hidden').should('exist');
    }
  });

  cy.findByTestId(`SingleInfo-${singleInfoNames.PHONE_NUMBER}`)
    .findByText(newData.phone)
    .should('exist');
};

describe('my account data page', () => {
  beforeEach(() => {
    cy.seedDb();
    cy.loginRequest(usedUser);
    cy.visit('/my-account/data');
  });

  it('edits all data, adds and removes admin', () => {
    // name
    cy.findByTestId(`SingleInfo-${singleInfoNames.NAME}-btn`).click();
    cy.findByTestId('ChangeName-firstName').clear().type(newData.firstName);
    cy.findByTestId('ChangeName-lastName').clear().type(newData.lastName);
    cy.submitForm();
    cy.closeMessageBox();
    // email
    cy.findByTestId(`SingleInfo-${singleInfoNames.EMAIL}-btn`).click();
    cy.findByTestId('ChangeEmail-email').clear().type(newData.email);
    cy.findByTestId('ChangeEmail-current-password').clear().type(usedUser.password);
    cy.submitForm();
    cy.closeMessageBox();
    // address
    cy.findByTestId(`SingleInfo-${singleInfoNames.ADDRESS}-btn`).click();
    cy.findByTestId('ChangeAddress-street').clear().type(newData.street);
    cy.findByTestId('ChangeAddress-zipCode').clear().type(newData.zipCode);
    cy.findByTestId('ChangeAddress-city').clear().type(newData.city);
    cy.findByTestId('Modal').findByText(usedUser.country).click();
    cy.findByText(newData.country).click();
    cy.submitForm();
    cy.closeMessageBox();
    // contacts
    cy.findByTestId(`SingleInfo-${singleInfoNames.CONTACTS}-btn`).click();
    cy.findByTestId('ChangeContacts-hideEmail').click({ force: true });
    cy.findByTestId('ChangeContacts-hidePhone').click({ force: true });
    cy.submitForm();
    cy.closeMessageBox();
    // phone number
    cy.findByTestId(`SingleInfo-${singleInfoNames.PHONE_NUMBER}-btn`).click();
    cy.findByTestId('Modal').findByText(usedUser.phonePrefixLabel).click();
    cy.findByText(newData.phonePrefixLabel).click();
    cy.findByTestId('ChangePhoneNumber-phoneNumber').clear().type(newData.phoneNumber);
    cy.submitForm();
    cy.closeMessageBox();
    // add admin
    cy.findByRole('button', { name: /add admin/i }).click();
    cy.findByTestId(`Modal-${modalTypes.ADD_ADMIN}`).should('exist');
    cy.findByTestId('AddAdmin-email').type(activeUser.email);
    cy.submitForm();
    cy.closeMessageBox();
    // remove admin
    cy.findByRole('button', { name: /remove admin/i }).click();
    cy.findByTestId(`Modal-${modalTypes.REMOVE_ADMIN}`).should('exist');
    cy.findByTestId('RemoveAdmin-email').type(activeUser.email);
    cy.submitForm();
    cy.findByTestId(`Modal-${modalTypes.REMOVE_ADMIN}`).should('not.exist');
    cy.closeMessageBox();

    // assert
    checkAccountData();
    cy.reload();
    checkAccountData();

    // verify email and assert with new email
    cy.request('PATCH', `${Cypress.env('API_URL')}/testing/verify-email`, {
      email: usedUser.email,
    });
    cy.reload();
    checkAccountData(true);

    // password
    cy.findByRole('button', { name: /change password/i }).click();
    cy.findByTestId('ChangePassword-current-password').clear().type(usedUser.password);
    cy.findByTestId('ChangePassword-password').clear().type(newData.password);
    cy.submitForm();
    cy.closeMessageBox();

    // logout, login, assert again
    cy.visit('/logout');
    cy.checkHash();
    cy.fillLoginForm(newData.email, newData.password, true, true);
    cy.findByTestId('Modal').should('not.exist');
    cy.visit('/my-account/data');
    checkAccountData(true);
  });

  it('fails or do nothing when changing all data', () => {
    // name
    let newFirstName = '';
    for (let i = 0; i < 70; i += 1) {
      newFirstName += 'e';
    }
    cy.findByTestId(`SingleInfo-${singleInfoNames.NAME}-btn`).click();
    cy.findByTestId('ChangeName-firstName').clear().type(newFirstName);
    cy.submitForm({ force: true });
    cy.findByTestId(`Modal-${modalTypes.CHANGE_NAME}`).should('exist');
    cy.findByTestId('Form-error').should('not.exist');
    cy.closeModal();
    // email
    cy.findByTestId(`SingleInfo-${singleInfoNames.EMAIL}-btn`).click();
    cy.findByTestId('ChangeEmail-email').clear().type(newData.email);
    cy.findByTestId('ChangeEmail-current-password').clear().type('incorrectPassword');
    cy.submitForm();
    cy.findByTestId('Form-error').should('exist');
    cy.closeModal();
    // address
    cy.findByTestId(`SingleInfo-${singleInfoNames.ADDRESS}-btn`).click();
    cy.findByTestId('ChangeAddress-zipCode').clear().type('invalidCode');
    cy.submitForm();
    cy.findByTestId('Form-error').should('exist');
    cy.closeModal();
    // contacts
    cy.findByTestId(`SingleInfo-${singleInfoNames.CONTACTS}-btn`).click();
    cy.submitForm({ force: true });
    cy.findByTestId(`Modal-${modalTypes.CHANGE_CONTACTS}`).should('exist');
    cy.findByTestId('Form-error').should('not.exist');
    cy.closeModal();
    // phone number
    cy.findByTestId(`SingleInfo-${singleInfoNames.PHONE_NUMBER}-btn`).click();
    cy.findByTestId('ChangePhoneNumber-phoneNumber').clear().type('invalidNumber');
    cy.findByTestId(`Modal-${modalTypes.CHANGE_PHONE_NUMBER}`).should('exist');
    cy.submitForm({ force: true });
    cy.findByTestId('Form-error').should('not.exist');
    cy.closeModal();
    // password
    cy.findByRole('button', { name: /change password/i }).click();
    cy.findByTestId('ChangePassword-current-password').clear().type('incorrectPassword');
    cy.findByTestId('ChangePassword-password').clear().type(newData.password);
    cy.submitForm();
    cy.findByTestId('Form-error').should('exist');
    cy.closeModal();
    // add admin
    cy.findByRole('button', { name: /add admin/i }).click();
    cy.findByTestId('AddAdmin-email').type('unexistingemail@example.com');
    cy.submitForm();
    cy.findByTestId('Form-error').should('exist');
    cy.closeModal();
    // remove admin
    cy.findByRole('button', { name: /remove admin/i }).click();
    cy.findByTestId('RemoveAdmin-email').type('unexistingemail@example.com');
    cy.submitForm();
    cy.findByTestId('Form-error').should('exist');
  });
});
