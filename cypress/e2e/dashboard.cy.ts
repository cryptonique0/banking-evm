describe('Dashboard E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the dashboard', () => {
    cy.contains('DeFi Bank Dashboard').should('be.visible');
  });

  it('should display wallet connection button', () => {
    cy.contains('Connect Wallet').should('be.visible');
  });

  it('should display balance stats', () => {
    cy.contains('Total Balance').should('be.visible');
    cy.contains('Total Deposits').should('be.visible');
    cy.contains('Total Withdrawals').should('be.visible');
  });

  it('should have deposit and withdrawal forms', () => {
    cy.contains('Deposit').should('be.visible');
    cy.contains('Withdraw').should('be.visible');
  });
});
