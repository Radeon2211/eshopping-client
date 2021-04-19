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
