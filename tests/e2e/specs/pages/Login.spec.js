describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('shows an error message if required fields are empty', () => {
    cy.get('button#login').click();
    cy.get('.error-message').should(
      'contain',
      'メールアドレス、パスワードを入力してください。'
    );
  });

  it('redirects to login page on successful login', () => {
    cy.get('input#email').type('test@example.com');
    cy.get('input#password').type('fidj9r3kre');
    cy.get('button#login').click();
    cy.url().should('include', '/dashboard');
  });
});
