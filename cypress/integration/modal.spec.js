import '@testing-library/cypress/add-commands';
import { modalTypes } from '../../src/shared/constants';

describe('modal behaviour', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('close with different ways', () => {
    it('closes after cancel button click', () => {
      cy.checkHash();
      cy.findByRole('button', { name: /login/i }).click();
      cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('exist');
      cy.findByRole('button', { name: /cancel/i }).click();
      cy.findByTestId('Modal').should('not.exist');
    });

    it('closes after close icon click', () => {
      cy.checkHash();
      cy.findByRole('button', { name: /login/i }).click();
      cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('exist');
      cy.closeModal();
      cy.findByTestId('Modal').should('not.exist');
    });

    it('closes after backdrop click', () => {
      cy.checkHash();
      cy.findByRole('button', { name: /login/i }).click();
      cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('exist');
      cy.findByTestId('Modal-backdrop').click();
      cy.findByTestId('Modal').should('not.exist');
    });
  });

  describe('clear form error', () => {
    it('clears form error after modal closing', () => {
      cy.checkHash();
      cy.findByRole('button', { name: /login/i }).click();
      cy.findByTestId('Login-email').type('random@email.com');
      cy.submitForm();
      cy.findByTestId('Form-error').should('exist');
      cy.closeModal();
      cy.findByTestId('Modal').should('not.exist');

      cy.findByRole('button', { name: /login/i }).click();
      cy.findByTestId('Form-error').should('not.exist');
    });

    it('clears form error after form change', () => {
      cy.checkHash();
      cy.findByRole('button', { name: /login/i }).click();
      cy.findByTestId('Login-email').type('random@email.com');
      cy.submitForm();
      cy.findByTestId('Form-error').should('exist');

      cy.findByTestId(`Modal-${modalTypes.LOGIN}`)
        .findByRole('link', /forgot password/i)
        .click();
      cy.findByTestId(`Modal-${modalTypes.RESET_PASSWORD}`).should('exist');
      cy.findByTestId('Form-error').should('not.exist');

      cy.findByTestId(`Modal-${modalTypes.RESET_PASSWORD}`).findByRole('link', /login/i).click();
      cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('exist');
      cy.findByTestId('Form-error').should('not.exist');
    });
  });

  describe('check when submit button is disabled', () => {
    it('does nothing after click', () => {
      cy.checkHash();
      cy.findByRole('button', { name: /login/i }).click();
      cy.submitForm({ force: true });
      cy.findByTestId('Form-error').should('not.exist');
      cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('exist');
    });
  });
});
