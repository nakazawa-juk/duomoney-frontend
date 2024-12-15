const HIDDEN_LEFT_MENU_PATHS = ['/login', '/signup'];

describe('App Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  HIDDEN_LEFT_MENU_PATHS.forEach((path) => {
    it(`does not display the menu on ${path}`, () => {
      cy.visit(path);

      // メニューが表示されていないことを確認
      cy.get('div.left-menu').should('not.exist');
    });
  });
});
