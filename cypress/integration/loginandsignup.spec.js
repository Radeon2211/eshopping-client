import '@testing-library/cypress/add-commands';
import { modalTypes } from '../../src/shared/constants';
import { userOne, testUser } from '../fixtures/users';

const fillSignupForm = () => {
  cy.findByTestId('Step1-email').type(testUser.email);
  cy.findByTestId('Step1-hideEmail').then(($checkbox) => {
    if (!testUser.contacts.email) {
      cy.wrap($checkbox).click({ force: true });
    }
  });
  cy.findByTestId('Step1-username').type(testUser.username);
  cy.findByTestId('Step1-password').type(testUser.password);
  cy.findByTestId('Step1-next-btn').click();

  cy.findByTestId('Step2-firstName').type(testUser.firstName);
  cy.findByTestId('Step2-lastName').type(testUser.lastName);
  cy.findByText(/choose your phone number prefix/i).click();
  cy.findByText(testUser.phonePrefixLabel).click();
  cy.findByTestId('Step2-phoneNumber').type(testUser.phoneNumber);
  cy.findByTestId('Step2-hidePhone').then(($checkbox) => {
    if (!testUser.contacts.phone) {
      cy.wrap($checkbox).click({ force: true });
    }
  });
  cy.findByTestId('Step2-next-btn').click();

  cy.findByTestId('Step3-street').type(testUser.street);
  cy.findByTestId('Step3-zipCode').type(testUser.zipCode);
  cy.findByTestId('Step3-city').type(testUser.city);
  cy.findByText(/choose your country/i).click();
  cy.findByText(testUser.country).click();
};

const deleteAccount = () => {
  cy.findByRole('button', { name: /delete account/i }).click();
  cy.findByTestId('DeleteAccount-current-password').type(testUser.password);
  cy.submitForm();
};

describe('login and signup form', () => {
  beforeEach(() => {
    cy.seedDb();
    cy.visit('/');
  });

  describe('login form', () => {
    it('logins and logouts correctly', () => {
      cy.checkHash();

      cy.fillLoginForm(userOne.email, userOne.password, true, true);
      cy.findByTestId('Modal').should('not.exist');
      cy.checkLoginState(true);
      cy.reload();
      cy.checkLoginState(true);
    });

    it('logins, deletes account and not logins', () => {
      cy.checkHash();

      cy.fillLoginForm(userOne.email, userOne.password, true, true);
      cy.findByTestId('LoggedInLinks-user-box').click();
      cy.findByTestId('Dropdown')
        .findByText(/my account/i)
        .click();
      deleteAccount();

      cy.closeMessageBox();
      cy.fillLoginForm(userOne.email, userOne.password, true, true);
      cy.findByTestId('Form-error').should('exist');
    });

    it('fails due to incorrect credentials', () => {
      cy.checkHash();

      cy.findByRole('button', { name: /login/i }).click();
      cy.findByTestId('Form-error').should('not.exist');
      cy.fillLoginForm('incorrect@email.com', 'incorrectPassword', false, true);
      cy.findByTestId('Form-error').should('exist');
    });
  });

  describe('signup form', () => {
    it('signups, sign outs and logins correctly to created account', () => {
      cy.checkHash();

      cy.findByRole('button', { name: /signup/i }).click();
      fillSignupForm();
      cy.submitForm();

      cy.findByTestId('Modal').should('not.exist');
      cy.checkLoginState(true);
      cy.findByTestId('LoggedInLinks-my-account-link')
        .findByText(testUser.username)
        .should('exist');
      cy.findByTestId('MessageBox').should('exist');
      cy.findByTestId('MessageBox', { timeout: 6000 }).should('not.exist');

      cy.reload();
      cy.findByTestId('LoggedInLinks-my-account-link')
        .findByText(testUser.username)
        .should('exist');

      cy.findByTestId('LoggedInLinks-my-account-link').click();
      cy.checkHash('#/my-account/data');

      cy.findByRole('button', { name: /logout/i }).click();
      cy.checkHash();
      cy.checkLoginState();

      cy.fillLoginForm(testUser.email, testUser.password, true, true);
      cy.findByTestId('LoggedInLinks-my-account-link')
        .findByText(testUser.username)
        .should('exist');
    });

    it('signups, deletes account and not logins', () => {
      cy.checkHash();

      cy.findByRole('button', { name: /signup/i }).click();
      fillSignupForm();
      cy.submitForm();

      cy.findByTestId('LoggedInLinks-my-account-link').click();
      deleteAccount();

      cy.closeMessageBox();
      cy.fillLoginForm(testUser.email, testUser.password, true, true);
      cy.findByTestId('Form-error').should('exist');
    });

    it('fails due to incorrect credentials', () => {
      cy.checkHash();

      cy.findByRole('button', { name: /signup/i }).click();
      fillSignupForm();
      cy.findByTestId('Form-error').should('not.exist');

      cy.findByTestId('Step3-previous-btn').click();
      cy.findByTestId('Step2-previous-btn').click();
      cy.findByTestId('Step1-email').clear().type(userOne.email);
      cy.findByTestId('Step1-next-btn').click();
      cy.findByTestId('Step2-next-btn').click();
      cy.submitForm();
      cy.findByTestId('Form-error').should('exist');
      cy.findByTestId(`Modal-${modalTypes.SIGNUP}`).should('exist');
    });
  });
});
