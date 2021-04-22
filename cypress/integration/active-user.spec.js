import '@testing-library/cypress/add-commands';
import { adminUser } from '../fixtures/users';
import { productTwo } from '../fixtures/products';

const usedUser = adminUser;

describe('authenticated user', () => {
  beforeEach(() => {
    cy.seedDb();
    cy.loginRequest(usedUser);
    cy.visit('/');
  });

  it('visits all pages', () => {
    cy.checkHash();

    // logged in links
    // cart
    cy.findByTestId('CartLink').click();
    cy.checkHash('#/cart');
    // my account data
    cy.findByTestId('LoggedInLinks-user-box').click();
    cy.findByTestId('Dropdown')
      .findByRole('link', { name: /my account/i })
      .click();
    cy.findByTestId('Dropdown').should('not.exist');
    cy.checkHash('#/my-account/data');
    // my products
    cy.findByTestId('LoggedInLinks-user-box').click();
    cy.findByTestId('Dropdown')
      .findByRole('link', { name: /my offers/i })
      .click();
    cy.findByTestId('Dropdown').should('not.exist');
    cy.checkHash('#/my-account/products?p=1');
    cy.findByTestId('ProductItem').should('have.length', 1);
    // my sell history
    cy.findByTestId('LoggedInLinks-user-box').click();
    cy.findByTestId('Dropdown')
      .findByRole('link', { name: /my sell history/i })
      .click();
    cy.findByTestId('Dropdown').should('not.exist');
    cy.checkHash('#/my-account/sell-history?p=1');
    cy.findByTestId('Orders-no-orders-info').should('exist');
    // my placed orders
    cy.findByTestId('LoggedInLinks-user-box').click();
    cy.findByTestId('Dropdown')
      .findByRole('link', { name: /placed orders/i })
      .click();
    cy.findByTestId('Dropdown').should('not.exist');
    cy.checkHash('#/my-account/placed-orders?p=1');
    cy.findByTestId('Orders-no-orders-info').should('exist');

    // navbar on /my-account
    // my account data
    cy.findByTestId('MyAccount-navigation').findByRole('link', { name: /data/i }).click();
    cy.checkHash('#/my-account/data');
    // my sell history
    cy.findByTestId('MyAccount-navigation')
      .findByRole('link', { name: /sell history/i })
      .click();
    cy.checkHash('#/my-account/sell-history?p=1');
    // my placed orders
    cy.findByTestId('MyAccount-navigation')
      .findByRole('link', { name: /placed orders/i })
      .click();
    cy.checkHash('#/my-account/placed-orders?p=1');
    // my products
    cy.findByTestId('MyAccount-navigation')
      .findByRole('link', { name: /products/i })
      .click();
    cy.checkHash('#/my-account/products?p=1');

    // rest
    // default page
    cy.findByTestId('Navbar-header-link').click();
    cy.checkHash();
    // product details
    cy.findByText(productTwo.name).closest('[data-testid="ProductItem"]').click();
    cy.checkHash('#/product/', 'contain');
    // transaction
    cy.findByRole('button', { name: /buy now/i }).click();
    cy.checkHash('#/transaction');
    cy.findByText(productTwo.name)
      .closest('[data-testid=TransactionAndOrderProdItem]')
      .should('exist');
    // other user details
    cy.go('back');
    cy.findByRole('link', { name: productTwo.seller.username }).click();
    cy.checkHash(`#/user/${productTwo.seller.username}?p=1`);
    // order details
    cy.visit('/order/123');
    cy.findByTestId('OrderDetails-error').should('exist');
    cy.checkHash('#/order/123');
  });
});
