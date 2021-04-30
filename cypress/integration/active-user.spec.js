import '@testing-library/cypress/add-commands';
import { adminUser } from '../fixtures/users';
import { productOne, productTwo } from '../fixtures/products';
import { productConditions } from '../../src/shared/constants';
import { formatPrice } from '../../src/shared/utility/utility';

const usedUser = adminUser;

const newProduct = {
  name: 'NewProduct',
  price: 1801.25,
  quantity: 49,
  condition: productConditions.USED,
  description: 'Description of cool new product',
};

describe('authenticated active user', () => {
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

  it('adds new product', () => {
    // open form
    cy.findByTestId('LoggedInLinks-user-box').click();
    cy.findByTestId('Dropdown')
      .findByRole('button', { name: /add product/i })
      .click();
    // fill and submit form
    cy.findByTestId('AddProduct-name').type(newProduct.name);
    cy.findByTestId('AddProduct-price').type(newProduct.price);
    cy.findByTestId('AddProduct-quantity').clear().type(newProduct.quantity);
    cy.findByTestId('AddProduct-condition-used').click({ force: true });
    cy.findByTestId('AddProduct-description').type(newProduct.description);
    cy.submitForm();
    // close message box
    cy.closeMessageBox();
    cy.findByTestId('Modal').should('not.exist');
    // check this product
    cy.visit('/my-account/products?p=1');
    cy.findByTestId('ProductList')
      .findByText(newProduct.name)
      .closest('[data-testid="ProductItem"]')
      .click();
    cy.findByText(formatPrice(newProduct.price)).should('exist');
    cy.findByText(newProduct.description).should('exist');
  });

  it('adds new product', () => {
    // open form
    cy.findByTestId('LoggedInLinks-user-box').click();
    cy.findByTestId('Dropdown')
      .findByRole('button', { name: /add product/i })
      .click();
    // fill and submit form
    cy.findByTestId('AddProduct-name').type(newProduct.name);
    cy.findByTestId('AddProduct-price').type(newProduct.price);
    cy.findByTestId('AddProduct-quantity').clear().type(newProduct.quantity);
    cy.findByTestId('AddProduct-condition-used').click({ force: true });
    cy.findByTestId('AddProduct-description').type(newProduct.description);
    cy.submitForm();
    // close message box
    cy.closeMessageBox();
    cy.findByTestId('Modal').should('not.exist');
    // check this product
    cy.visit('/my-account/products?p=1');
    cy.findByTestId('ProductList')
      .findByText(newProduct.name)
      .closest('[data-testid="ProductItem"]')
      .click();
    cy.findByText(formatPrice(newProduct.price)).should('exist');
    cy.findByText(newProduct.description).should('exist');
  });

  it('deletes a product', () => {
    cy.visit('/my-account/products?p=1');
    cy.findByTestId('ProductItem').should('have.length.above', 0);
    cy.findByTestId('ProductList')
      .findByText(productOne.name)
      .closest('[data-testid="ProductItem"]')
      .click();
    cy.findByRole('button', { name: /delete offer/i }).click();
    cy.findByTestId('Modal')
      .findByRole('button', { name: /delete/i })
      .click();
    cy.findByTestId('MessageBox').should('exist');
    cy.findByTestId('Modal').should('not.exist');
    cy.findByTestId('ProductList-empty-list-info').should('exist');
    cy.checkHash('#/my-account/products?p=1');
  });

  it('edits a product', () => {
    cy.visit('/my-account/products?p=1');
    cy.findByTestId('ProductItem').should('have.length.above', 0);
    cy.findByTestId('ProductList')
      .findByText(productOne.name)
      .closest('[data-testid="ProductItem"]')
      .click();
    cy.findByRole('button', { name: /edit offer/i }).click();
    // fill and submit form
    cy.findByTestId('EditProduct-name').clear().type(newProduct.name);
    cy.findByTestId('EditProduct-price').clear().type(newProduct.price);
    cy.findByTestId('EditProduct-quantity').clear().type(newProduct.quantity);
    cy.findByTestId('EditProduct-condition-used').click({ force: true });
    cy.findByTestId('EditProduct-description').clear().type(newProduct.description);
    cy.submitForm();
    cy.findByTestId('MessageBox').should('exist');
    cy.findByTestId('Modal').should('not.exist');
    cy.findByText(newProduct.name).should('exist');
    cy.findByText(formatPrice(newProduct.price)).should('exist');
    cy.findByText(newProduct.description).should('exist');
  });
});
