describe('GlobalHeader Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the GlobalHeader component', () => {
    cy.get('nav.navbar').should('exist');
  });

  it('navigates to the home page when the logo is clicked', () => {
    cy.get('nav.navbar .navbar-brand').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}`);
  });

  it('closes the menu when the window is resized to a large width', () => {
    // Resize the window to a small width
    cy.viewport(500, 800);
    cy.wait(500);

    // Open the menu
    cy.get('nav.navbar .navbar-toggler').click();
    cy.get('nav.navbar .menu-overlay').should('exist');

    // Resize the window to a large width
    cy.viewport(1200, 800);
    cy.wait(500);

    // Check that the menu is closed
    cy.get('nav.navbar .menu-overlay').should('not.exist');
  });

  it('shows correct elements for large screen width', () => {
    // Resize the window to a large width
    cy.viewport(1200, 800);
    cy.wait(500);

    // Check that the logout button and user link are visible
    cy.get('nav.navbar .btn-outline-danger').should('be.visible');
    cy.get('nav.navbar .nav-link').should('be.visible');

    // Check that the menu overlay items are not visible
    cy.get('nav.navbar .menu-overlay li').should('not.exist');
  });

  it('shows correct elements for small screen width', () => {
    // Resize the window to a small width
    cy.viewport(500, 800);
    cy.wait(500);

    // Check that the logout button and user link are not visible
    cy.get('nav.navbar .btn-outline-danger').should('not.be.visible');
    cy.get('nav.navbar .nav-link').should('not.be.visible');

    // Open the menu
    cy.get('nav.navbar .navbar-toggler').click();
    cy.get('nav.navbar .menu-overlay').should('exist');

    // Check that the menu overlay items are visible
    cy.get('nav.navbar .menu-overlay li').should('exist');
  });

  it('toggles the menu when the navbar-toggler is clicked', () => {
    // Resize the window to a small width
    cy.viewport(500, 800);
    cy.wait(500);

    cy.get('nav.navbar .navbar-toggler').click();
    cy.get('nav.navbar .menu-overlay').should('exist');
    cy.get('nav.navbar .navbar-toggler').click();
    cy.get('nav.navbar .menu-overlay').should('not.exist');
  });

  it('navigates to the user settings page when the user name is clicked', () => {
    cy.get('nav.navbar .nav-link').click();
    cy.url().should('include', '/setting');
  });

  it('logs out the user when the logout button is clicked', () => {
    cy.get('nav.navbar .btn-outline-danger').click();
    cy.url().should('include', '/login');
  });

  it('navigates to the correct pages from the menu overlay', () => {
    // Resize the window to a small width
    cy.viewport(500, 800);
    cy.wait(500);

    cy.get('nav.navbar .navbar-toggler').click();
    cy.get('nav.navbar .menu-overlay').should('exist');

    cy.get('nav.navbar .menu-overlay li').contains('ダッシュボード').click();
    cy.url().should('include', '/dashboard');

    cy.get('nav.navbar .navbar-toggler').click();
    cy.get('nav.navbar .menu-overlay li').contains('収入・支出の追加').click();
    cy.url().should('include', '/transaction/add');

    cy.get('nav.navbar .navbar-toggler').click();
    cy.get('nav.navbar .menu-overlay li').contains('収支一覧').click();
    cy.url().should('include', '/transactions');

    cy.get('nav.navbar .navbar-toggler').click();
    cy.get('nav.navbar .menu-overlay li').contains('家計分析').click();
    cy.url().should('include', '/analysis');

    cy.get('nav.navbar .navbar-toggler').click();
    cy.get('nav.navbar .menu-overlay li').contains('通知').click();
    cy.url().should('include', '/notifications');

    cy.get('nav.navbar .navbar-toggler').click();
    cy.get('nav.navbar .menu-overlay li').contains('ユーザー登録').click();
    cy.url().should('include', '/signup');

    cy.get('nav.navbar .navbar-toggler').click();
    cy.get('nav.navbar .menu-overlay li').contains('ユーザー設定').click();
    cy.url().should('include', '/setting');
  });

  it('closes the menu when a menu item is clicked', () => {
    // Resize the window to a small width
    cy.viewport(500, 800);
    cy.wait(500);

    // Open the menu
    cy.get('nav.navbar .navbar-toggler').click();
    cy.get('nav.navbar .menu-overlay').should('exist');

    // Click a menu item
    cy.get('nav.navbar .menu-overlay li').contains('ダッシュボード').click();
    cy.url().should('include', '/dashboard');

    // Check that the menu is closed
    cy.get('nav.navbar .menu-overlay').should('not.exist');
  });

  it('closes the menu when clicking outside the menu', () => {
    // Resize the window to a small width
    cy.viewport(500, 800);
    cy.wait(500);

    // Open the menu
    cy.get('nav.navbar .navbar-toggler').click();
    cy.get('nav.navbar .menu-overlay').should('exist');

    // Click outside the menu
    cy.get('body').click(400, 400);

    // Check that the menu is closed
    cy.get('nav.navbar .menu-overlay').should('not.exist');
  });
});
