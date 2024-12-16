describe('AddTransaction Page', () => {
  beforeEach(() => {
    cy.visit('/transaction/add');
  });

  it('shows an error message if required fields are empty', () => {
    cy.get('button').contains('追加').click();
    cy.get('.error-message').should(
      'contain',
      '有効な金額を入力してください。'
    );
  });

  it('shows an error message if amount is invalid', () => {
    cy.get('select#type').select('収入');
    cy.get('input#amount').type('-100');
    cy.get('select#category').select('食費');
    cy.get('input#date').type('2023-10-01');
    cy.get('button').contains('追加').click();
    cy.get('.error-message').should(
      'contain',
      '有効な金額を入力してください。'
    );
  });

  it('shows an error message if category is not selected', () => {
    cy.get('select#type').select('収入');
    cy.get('input#amount').type('1000');
    cy.get('input#date').type('2023-10-01');
    cy.get('button').contains('追加').click();
    cy.get('.error-message').should('contain', 'カテゴリを選択してください。');
  });

  it('shows an error message if date is not selected', () => {
    cy.get('select#type').select('収入');
    cy.get('input#amount').type('1000');
    cy.get('select#category').select('食費');
    cy.get('button').contains('追加').click();
    cy.get('.error-message').should('contain', '日付を選択してください。');
  });

  it('shows a success message on successful transaction addition', () => {
    cy.get('select#type').select('収入');
    cy.get('input#amount').type('1000');
    cy.get('select#category').select('食費');
    cy.get('input#date').type('2023-10-01');
    cy.get('input#description').type('テストメモ');
    cy.get('button').contains('追加').click();
    cy.get('.success-message').should('contain', '追加完了');

    // フォームがリセットされることを確認
    cy.get('input#amount').should('have.value', '');
    cy.get('input#description').should('have.value', '');

    // 一定時間後に成功メッセージが非表示になることを確認
    cy.wait(3000); // 3秒待つ
    cy.get('.success-message').should('not.exist');
  });
});
