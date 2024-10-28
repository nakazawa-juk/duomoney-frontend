describe('Invite Page', () => {
  beforeEach(() => {
    cy.visit('/invite');
  });

  it('shows an error message if required fields are empty', () => {
    cy.get('button#invite').click();
    cy.get('.error-message').should(
      'contain',
      'メールアドレスを入力してください。'
    );
  });

  it('redirects to invite page on successful invite', () => {
    cy.get('input#email').type('test@example.com');
    cy.get('button#invite').click();
    cy.url().should('include', '/settings');
  });
});
