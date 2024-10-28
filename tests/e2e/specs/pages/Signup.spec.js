describe('Signup Page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('shows an error message if required fields are empty', () => {
    cy.get('button#signup').click();
    cy.get('.error-message').should(
      'contain',
      'ユーザー名、メールアドレス、パスワードを入力してください。'
    );
  });

  it('shows an error message if email is invalid', () => {
    cy.get('input#username').type('testuser');
    cy.get('input#email').type('invalid-email');
    cy.get('input#password').type('fidj9r3kre');
    cy.get('button#signup').click();
    cy.get('.error-message').should(
      'contain',
      '有効なメールアドレスを入力してください。'
    );
  });

  it('shows an error message if password is invalid', () => {
    cy.get('input#username').type('testuser');
    cy.get('input#email').type('test@example.com');
    cy.get('input#password').type('invalid');
    cy.get('button#signup').click();
    cy.get('.error-message').should(
      'contain',
      'パスワードは8文字以上で、半角数字と半角文字の両方を含む必要があります。記号や特殊文字は使用できません。'
    );
  });

  it('redirects to login page on successful signup', () => {
    cy.get('input#username').type('testuser');
    cy.get('input#email').type('test@example.com');
    cy.get('input#password').type('fidj9r3kre');
    cy.get('button#signup').click();
    cy.url().should('include', '/login');
  });
});
