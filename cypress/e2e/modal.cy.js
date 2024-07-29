import { defaultAppPath } from '../../src/shared/constants';
import { ModalType } from '../../src/shared/types/types';

describe('modal behaviour', () => {
  beforeEach(() => {
    cy.visit(defaultAppPath);
  });

  describe('close with different ways', () => {
    it('closes after cancel button click', () => {
      cy.checkHash();
      cy.findByRole('button', { name: /login/i }).click();
      cy.findByTestId(`Modal-${ModalType.LOGIN}`).should('exist');
      cy.findByRole('button', { name: /cancel/i }).click();
      cy.findByTestId('Modal').should('not.exist');
    });

    it('closes after close icon click', () => {
      cy.checkHash();
      cy.findByRole('button', { name: /login/i }).click();
      cy.findByTestId(`Modal-${ModalType.LOGIN}`).should('exist');
      cy.closeModal();
      cy.findByTestId('Modal').should('not.exist');
    });

    it('closes after backdrop click', () => {
      cy.checkHash();
      cy.findByRole('button', { name: /login/i }).click();
      cy.findByTestId(`Modal-${ModalType.LOGIN}`).should('exist');
      cy.findByTestId('Modal-backdrop').click({ force: true });
      cy.findByTestId('Modal').should('not.exist');
    });
  });

  describe('clear form error', () => {
    it('clears form error after modal closing', () => {
      cy.checkHash();
      cy.findByRole('button', { name: /login/i }).click();
      cy.findByTestId('Login-email').type('unexisting@example.com');
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
      cy.findByTestId('Login-email').type('unexisting@example.com');
      cy.submitForm();
      cy.findByTestId('Form-error').should('exist');

      cy.findByTestId(`Modal-${ModalType.LOGIN}`)
        .findByRole('link', { name: /forgot password/i })
        .click();
      cy.findByTestId(`Modal-${ModalType.RESET_PASSWORD}`).should('exist');
      cy.findByTestId('Form-error').should('not.exist');

      cy.findByTestId(`Modal-${ModalType.RESET_PASSWORD}`)
        .findByRole('link', { name: /login/i })
        .click();
      cy.findByTestId(`Modal-${ModalType.LOGIN}`).should('exist');
      cy.findByTestId('Form-error').should('not.exist');
    });
  });

  describe('submit button is disabled', () => {
    it('does nothing after click on disabled submit button', () => {
      cy.checkHash();
      cy.findByRole('button', { name: /login/i }).click();
      cy.submitForm({ force: true });
      cy.findByTestId('Form-error').should('not.exist');
      cy.findByTestId(`Modal-${ModalType.LOGIN}`).should('exist');
    });
  });

  describe('changing routes', () => {
    it('closes modal when route changed', () => {
      cy.checkHash();
      cy.findAllByTestId('ProductItem').first().click();
      cy.findByRole('button', { name: /buy now/i }).click();
      cy.findByTestId(`Modal-${ModalType.LOGIN}`).should('exist');
      cy.visit('/products?p=1');
      cy.findByTestId('Modal').should('not.exist');
    });
  });
});
