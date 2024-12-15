describe('Setting Page', () => {
  beforeEach(() => {
    cy.visit('/setting');
  });

  it('shows an error message if username or email is empty', () => {
    cy.get('button#update-profile').click();
    cy.get('.error-message').should(
      'contain',
      'ユーザー名、メールアドレスを入力してください。'
    );
  });

  it('shows an error message if email is invalid', () => {
    cy.get('input#username').type('testuser');
    cy.get('input#email').type('invalid-email');
    cy.get('button#update-profile').click();
    cy.get('.error-message').should(
      'contain',
      '有効なメールアドレスを入力してください。'
    );
  });

  // TODO: API呼び出しの実装後にコメントを外す
  // it('calls updateProfile method on form submit', () => {
  //   cy.intercept('POST', '/api/updateProfile', {
  //     statusCode: 200,
  //     body: { success: true },
  //   }).as('updateProfile');

  //   cy.get('input#username').type('testuser');
  //   cy.get('input#email').type('test@example.com');
  //   cy.get('button#update-profile').click();

  //   cy.wait('@updateProfile').its('request.body').should('include', {
  //     username: 'testuser',
  //     email: 'test@example.com',
  //   });
  // });

  it('navigates to invite page on button click', () => {
    cy.get('button#invite').click();
    cy.url().should('include', '/invite');
  });

  // TODO: API呼び出しの実装後にコメントを外す
  // it('calls deleteAccount method on button click', () => {
  //   cy.intercept('POST', '/api/deleteAccount', {
  //     statusCode: 200,
  //     body: { success: true },
  //   }).as('deleteAccount');

  //   cy.get('button#delete-account').click();

  //   cy.wait('@deleteAccount').its('response.statusCode').should('eq', 200);
  //   cy.url().should('include', '/login');
  // });
});
