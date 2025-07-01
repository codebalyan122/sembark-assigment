describe('E-commerce Application Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test to ensure clean state
    cy.clearLocalStorage();
    cy.visit('http://localhost:5173/');
  });

  describe('Homepage and Product Listing', () => {
    it('should load the homepage successfully', () => {
      cy.visit('http://localhost:5173/');
      cy.get('[data-testid="nav"]').should('be.visible');
      cy.contains('Loading...').should('be.visible');
      
      // Wait for products to load
      cy.get('.App', { timeout: 10000 }).should('not.contain', 'Loading...');
    });

    it('should display products after loading', () => {
      // Wait for products to load
      cy.get('.App', { timeout: 10000 }).should('not.contain', 'Loading...');
      
      // Check if products are displayed
      cy.get('.flex.flex-wrap.justify-center.gap-4')
        .children()
        .should('have.length.greaterThan', 0);
    });

    it('should display category filter buttons', () => {
      // Wait for products to load
      cy.get('.App', { timeout: 10000 }).should('not.contain', 'Loading...');
      
      // Check if category buttons are present
      cy.get('.flex.flex-row.items-center.justify-center.space-x-4')
        .should('be.visible');
      
      // Should have "All Products" button
      cy.contains('All Products').should('be.visible');
    });

    it('should filter products by category', () => {
      // Wait for products to load
      cy.get('.App', { timeout: 10000 }).should('not.contain', 'Loading...');
      
      // Get initial product count
      cy.get('.flex.flex-wrap.justify-center.gap-4')
        .children()
        .its('length')
        .as('totalProducts');
      
      // Click on a specific category (assuming "electronics" exists)
      cy.contains('Electronics').click();
      
      // Verify the category button is highlighted
      cy.contains('Electronics')
        .should('have.class', 'bg-blue-600');
      
      // Check if products are filtered
      cy.contains('electronics products').should('be.visible');
    });

      


  });

  describe('Navigation', () => {
    it('should navigate between Home and Cart', () => {
      // Test Home navigation
      cy.contains('Home').click();
      cy.url().should('eq', 'http://localhost:5173/');
      
    })
  });


});