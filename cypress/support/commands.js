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
  cy.findByTestId('MessageBox-close-icon').click();
});

Cypress.Commands.add('checkLoginState', (shouldBeLogged) => {
  if (shouldBeLogged) {
    cy.findByTestId('LoggedInLinks').should('exist');
    cy.findByTestId('LoggedOutLinks').should('not.exist');
  } else {
    cy.findByTestId('LoggedInLinks').should('not.exist');
    cy.findByTestId('LoggedOutLinks').should('exist');
  }
});
