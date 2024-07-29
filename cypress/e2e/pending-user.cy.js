import { pendingUser } from '../fixtures/users';
import { productOne } from '../fixtures/products';
import { ModalType } from '../../src/shared/types/types';

const usedUser = pendingUser;

const activateAccountAndCheck = () => {
  cy.request('PATCH', `${Cypress.env('API_URL')}/testing/activate-account`, {
    email: usedUser.email,
  });
  cy.reload();
  cy.findByRole('button', { name: /send verification link/i }).should('not.exist');
};

describe('pending user', () => {
  beforeEach(() => {
    cy.seedDb();
    cy.loginRequest(usedUser);
    cy.visit('/');
  });

  describe('visiting pages', () => {
    it('visits available pages', () => {
      cy.checkHash();

      cy.findByText(productOne.name).closest('[data-testid="ProductItem"]').click();
      cy.checkHash('#/product/', 'contain');

      cy.findByRole('link', { name: productOne.seller.username }).click();
      cy.checkHash(`#/user/${productOne.seller.username}?p=1`);

      cy.findByTestId('LoggedInLinks-my-account-link').click();
      cy.checkHash('#/my-account/data');
    });

    it('does not visit landing page and pages for active users', () => {
      cy.checkHash();
      cy.visit('/');
      cy.checkHash();
      cy.visit('/cart');
      cy.checkHash();
      cy.visit('/my-account/products');
      cy.checkHash('#/my-account/data');
      cy.visit('/my-account/placed-orders');
      cy.checkHash('#/my-account/data');
      cy.visit('/my-account/sell-history');
      cy.checkHash('#/my-account/data');
      cy.visit('/transaction');
      cy.checkHash();
      cy.visit('/order/123');
      cy.checkHash();
    });
  });

  describe('product details page', () => {
    it('opens modal with info for pending user when trying to buy or add product to cart', () => {
      cy.findByText(productOne.name).closest('[data-testid="ProductItem"]').click();

      cy.findByRole('button', { name: /add to cart/i }).click();
      cy.findByTestId(`Modal-${ModalType.PENDING_USER_INFO}`).should('exist');
      cy.findByRole('button', { name: /ok/i }).click();

      cy.findByRole('button', { name: /buy now/i }).click();
      cy.findByTestId(`Modal-${ModalType.PENDING_USER_INFO}`).should('exist');
      cy.findByRole('button', { name: /ok/i }).click();
      cy.findByTestId('Modal').should('not.exist');
    });
  });

  describe('account verification', () => {
    it('sends verification link and activates account', () => {
      cy.findByTestId('LoggedInLinks-my-account-link').click();
      cy.findByRole('button', { name: /send verification link/i }).click();
      cy.findByTestId(`Modal-${ModalType.SEND_VERIFICATION_LINK}`).should('exist');
      cy.findByTestId('Modal').findByRole('button', { name: /send/i }).click();
      cy.findByTestId('Modal').should('not.exist');
      cy.findByTestId('MessageBox').should('exist');
      activateAccountAndCheck();
    });
  });
});
