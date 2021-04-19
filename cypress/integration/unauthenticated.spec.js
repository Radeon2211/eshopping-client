import '@testing-library/cypress/add-commands';
import { modalTypes } from '../../src/shared/constants';
import { userOne } from '../fixtures/users';
import { productOne } from '../fixtures/products';

describe('unauthenticated user', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('API_URL')}/seed`);
    cy.visit('/');
  });

  describe('check rendering and flow', () => {
    it('renders correct elements', () => {
      cy.findByTestId('LoggedOutLinks').should('exist');
      cy.findByTestId('LoggedInLinks').should('not.exist');
      cy.findByTestId('ProductItem').should('have.length', 1);
    });

    it('opens and closes modals with different ways correctly', () => {
      cy.checkHash();
      // login and reset password
      cy.findByRole('button', { name: /login/i }).click();
      cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('exist');
      cy.findByTestId(`Modal-${modalTypes.LOGIN}`)
        .findByRole('link', /forgot password/i)
        .click();

      cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('not.exist');
      cy.findByTestId(`Modal-${modalTypes.RESET_PASSWORD}`).should('exist');
      cy.findByTestId(`Modal-${modalTypes.RESET_PASSWORD}`).findByRole('link', /login/i).click();

      cy.findByTestId(`Modal-${modalTypes.RESET_PASSWORD}`).should('not.exist');
      cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('exist');
      cy.closeModal();
      cy.findByTestId('Modal').should('not.exist');
      // signup
      cy.findByRole('button', { name: /signup/i }).click();
      cy.findByTestId(`Modal-${modalTypes.SIGNUP}`).should('exist');
      cy.closeModal();
      cy.findByTestId('Modal').should('not.exist');
      // about website
      cy.findByRole('button', { name: /about website/i }).click();
      cy.findByTestId(`Modal-${modalTypes.ABOUT_WEBSITE}`).should('exist');
      cy.closeModal();
      cy.findByTestId('Modal').should('not.exist');
    });

    it('visits available pages', () => {
      cy.checkHash();

      cy.findByText(productOne.name).closest('[data-testid="ProductItem"]').click();
      cy.checkHash('#/product/', 'contain');

      cy.findByRole('link', { name: productOne.seller.username }).click();
      cy.checkHash(`#/user/${productOne.seller.username}?p=1`);

      cy.findByTestId('Navbar-header-link').click();
      cy.checkHash();
    });

    it('does not visit unavailable pages', () => {
      cy.checkHash();
      cy.visit('/cart');
      cy.checkHash();
      cy.visit('/my-account/data');
      cy.checkHash();
      cy.visit('/my-account/products');
      cy.checkHash();
      cy.visit('/my-account/placed-orders');
      cy.checkHash();
      cy.visit('/my-account/sell-history');
      cy.checkHash();
      cy.visit('/my-account/transaction');
      cy.checkHash();
    });

    it('checks how product details page works', () => {
      cy.findByText(productOne.name).closest('[data-testid="ProductItem"]').click();
      cy.findByRole('heading', { name: productOne.name }).should('exist');

      cy.findByRole('button', { name: /add to cart/i }).click();
      cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('exist');
      cy.closeModal();
      cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('not.exist');

      cy.findByRole('button', { name: /buy now/i }).click();
      cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('exist');
      cy.closeModal();
      cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('not.exist');

      cy.findByRole('link', { name: productOne.seller.username }).click();
      cy.checkHash(`#/user/${productOne.seller.username}?p=1`);
    });

    it('checks how other user page works', () => {
      cy.visit(`/user/${userOne.username}`);
      cy.findByRole('heading', { name: userOne.username }).should('exist');
      cy.findByText(userOne.email).should('exist');
      cy.findByText(userOne.phone).should('exist');
      cy.findByTestId('ProductItem').should('have.length', 1);
    });
  });

  describe('login form', () => {
    it('logins correctly', () => {
      cy.checkHash();
      cy.findByRole('button', { name: /login/i }).click();
      cy.findByTestId('Login-email').type(userOne.email);
      cy.findByTestId('Login-password').type(userOne.password);
      cy.submitForm();
      cy.findByTestId('Modal').should('not.exist');
      cy.findByTestId('LoggedOutLinks').should('not.exist');
      cy.findByTestId('LoggedInLinks').should('exist');
      cy.reload();
      cy.findByTestId('LoggedInLinks').should('exist');
    });

    it('fails due to incorrect credentials', () => {
      cy.checkHash();
      cy.findByRole('button', { name: /login/i }).click();
      cy.findByTestId('Form-error').should('not.exist');
      cy.findByTestId('Login-email').type('incorrect@email.com');
      cy.findByTestId('Login-password').type('incorrectPassword');
      cy.submitForm();
      cy.findByTestId('Form-error').should('exist');
    });

    it('does nothing after clicking at disabled submit button', () => {
      cy.checkHash();
      cy.findByRole('button', { name: /login/i }).click();
      cy.submitForm({ force: true });
      cy.findByTestId('Form-error').should('not.exist');
      cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('exist');
      cy.findByTestId('LoggedOutLinks').should('exist');
      cy.findByTestId('LoggedInLinks').should('not.exist');
    });
  });
});
