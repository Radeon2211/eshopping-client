import '@testing-library/cypress/add-commands';
import { defaultAppPath, modalTypes } from '../../src/shared/constants';
import { testUser, adminUser } from '../fixtures/users';
import { productOne, allProducts } from '../fixtures/products';

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

describe('unauthenticated user', () => {
  beforeEach(() => {
    cy.seedDb();
  });

  describe('landing page', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('renders landing page without navbar and footer', () => {
      cy.findByTestId('Navbar').should('not.exist');
      cy.findByTestId('Footer').should('not.exist');
      cy.findByTestId('LandingPage').should('exist');
    });

    it('opens login and signup modals and goes to products page', () => {
      cy.findByRole('button', { name: /login/i }).click();
      cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('exist');
      cy.closeModal();
      cy.findByRole('button', { name: /signup/i }).click();
      cy.findByTestId(`Modal-${modalTypes.SIGNUP}`).should('exist');
      cy.closeModal();
      cy.findByRole('button', { name: /view the products now/i }).click();
      cy.checkHash();
      cy.go('back');
      cy.checkHash('#/');
    });

    it('logins, goes to products page and not be able to go to landing page', () => {
      cy.fillLoginForm(adminUser.email, adminUser.password, true, true);
      cy.checkHash();
      cy.visit('/');
      cy.checkHash();
    });
  });

  describe('other pages', () => {
    beforeEach(() => {
      cy.visit(defaultAppPath);
    });

    describe('check rendering and flow', () => {
      it('renders correct elements', () => {
        cy.checkLoginState();
        cy.findAllByTestId('ProductItem').should('have.length', allProducts.length);
      });

      it('opens and closes modals correctly', () => {
        cy.checkHash();
        // login and reset password
        cy.findByRole('button', { name: /login/i }).click();
        cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('exist');
        cy.findByTestId(`Modal-${modalTypes.LOGIN}`)
          .findByRole('link', /forgot password/i)
          .click();

        cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('not.exist');
        cy.findByTestId(`Modal-${modalTypes.RESET_PASSWORD}`).should('exist');
        cy.findByTestId(`Modal-${modalTypes.RESET_PASSWORD}`)
          .findByRole('link', { name: /login/i })
          .click();

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
        cy.visit('/transaction');
        cy.checkHash();
        cy.visit('/order/123');
        cy.checkHash();
      });

      it('checks how product details page works', () => {
        cy.findByText(productOne.name).closest('[data-testid="ProductItem"]').click();
        cy.findByRole('heading', { name: productOne.name }).should('exist');

        cy.findByRole('button', { name: /add to cart/i }).click();
        cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('exist');
        cy.closeModal();

        cy.findByRole('button', { name: /buy now/i }).click();
        cy.findByTestId(`Modal-${modalTypes.LOGIN}`).should('exist');
        cy.closeModal();

        cy.findByRole('link', { name: productOne.seller.username }).click();
        cy.checkHash(`#/user/${productOne.seller.username}?p=1`);
      });

      it('checks how other user page works', () => {
        cy.visit(`/user/${adminUser.username}`);
        cy.findByRole('heading', { name: adminUser.username }).should('exist');
        cy.findByText(adminUser.email).should('exist');
        cy.findByText(adminUser.phone).should('exist');
        cy.findByTestId('ProductItem').should('have.length', 1);
      });
    });

    describe('forms', () => {
      describe('login form', () => {
        it('logins and logouts correctly', () => {
          cy.checkHash();

          cy.fillLoginForm(adminUser.email, adminUser.password, true, true);
          cy.findByTestId('Modal').should('not.exist');
          cy.checkLoginState(true);
          cy.reload();
          cy.checkLoginState(true);
        });

        it('logins, deletes account and not logins', () => {
          cy.checkHash();

          cy.fillLoginForm(adminUser.email, adminUser.password, true, true);
          cy.findByTestId('LoggedInLinks-user-box').click();
          cy.findByTestId('Dropdown')
            .findByRole('link', { name: /my account/i })
            .click();
          deleteAccount();

          cy.closeMessageBox();
          cy.fillLoginForm(adminUser.email, adminUser.password, true, true);
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
        it('signups, sign outs, logins, activates account correctly', () => {
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
          cy.findByTestId('LoggedInLinks-my-account-link').click();

          cy.request('PATCH', `${Cypress.env('API_URL')}/testing/activate-account`, {
            email: testUser.email,
          });
          cy.reload();
          cy.findByRole('button', { name: /send verification link/i }).should('not.exist');
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
          cy.findByTestId('Step1-email').clear().type(adminUser.email);
          cy.findByTestId('Step1-next-btn').click();
          cy.findByTestId('Step2-next-btn').click();
          cy.submitForm();
          cy.findByTestId('Form-error').should('exist');
          cy.findByTestId(`Modal-${modalTypes.SIGNUP}`).should('exist');
        });
      });

      describe('reset password form', () => {
        it('succeeds', () => {
          cy.checkHash();

          cy.findByRole('button', { name: /login/i }).click();
          cy.findByRole('link', { name: /forgot password/i }).click();
          cy.findByTestId('ResetPassword-email').type(adminUser.email);
          cy.submitForm();
          cy.findByTestId('Modal').should('not.exist');
          cy.closeMessageBox();
        });

        it('fails due to unexisting email', () => {
          cy.checkHash();

          cy.findByRole('button', { name: /login/i }).click();
          cy.findByRole('link', { name: /forgot password/i }).click();
          cy.findByTestId('ResetPassword-email').type('unexisting@example.com');
          cy.submitForm();
          cy.findByTestId('Form-error').should('exist');
        });
      });
    });
  });
});
