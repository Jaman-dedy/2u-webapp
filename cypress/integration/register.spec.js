describe('Register', () => {
  it('should go to the Register page', () => {
    cy.visit('/register');
    cy.location('pathname').should('eq', '/register');
  });
});
