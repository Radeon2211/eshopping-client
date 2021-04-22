Cypress.Commands.add('seedDb', () => {
  cy.request('PATCH', `${Cypress.env('API_URL')}/testing/seed`);
});

Cypress.Commands.add('closeModal', () => {
  cy.findByTestId('Modal-close-icon').click();
});

Cypress.Commands.add(
  'checkHash',
  (expectedHash = Cypress.env('DEFAULT_APP_HASH'), chainer = 'eq') => {
    cy.hash().should(chainer, expectedHash);
  },
);

Cypress.Commands.add('submitForm', (options = {}) => {
  cy.findByTestId('Modal').find('button[type=submit]').click(options);
});

Cypress.Commands.add('closeMessageBox', () => {
  cy.findByTestId('MessageBox-close-icon').then(($icon) => {
    if ($icon.length > 0) {
      cy.wrap($icon).click({ force: true });
    }
  });
});

Cypress.Commands.add('checkLoginState', (shouldBeLogged = false) => {
  if (shouldBeLogged) {
    cy.findByTestId('LoggedInLinks').should('exist');
    cy.findByTestId('LoggedOutLinks').should('not.exist');
  } else {
    cy.findByTestId('LoggedInLinks').should('not.exist');
    cy.findByTestId('LoggedOutLinks').should('exist');
  }
});

Cypress.Commands.add('loginRequest', (user) => {
  cy.request('POST', `${Cypress.env('API_URL')}/users/login`, {
    email: user.email,
    password: user.password,
  });
});

Cypress.Commands.add('fillLoginForm', (email, password, openModal = false, submitForm = false) => {
  if (openModal) {
    cy.findByRole('button', { name: /login/i }).click({ force: true });
  }
  cy.findByTestId('Login-email').type(email);
  cy.findByTestId('Login-password').type(password);
  if (submitForm) {
    cy.submitForm();
  }
});
