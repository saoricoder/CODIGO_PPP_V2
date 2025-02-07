// cypress/e2e/02-personal-salud-tests/vista-personal-salud.cy.js

describe('Personal de Salud Management', () => {
    beforeEach(() => {
      // Login
      cy.login();
      cy.visit('/fcc-personal-salud');
      // Wait for the page to load completely
      cy.get('table').should('be.visible');
    });
  
    it('should search for a healthcare personnel', () => {
      cy.get('input[type="text"]').clear().type('María');
      cy.get('table').contains('td', 'María').should('be.visible');
    });
  
    it('should deactivate and reactivate a healthcare personnel', () => {
      // Deactivate personnel
      cy.get('table').contains('tr', 'María').within(() => {
        cy.get('span').contains('Activo').click();
      });
      cy.contains('button', 'Desactivar').click();
      cy.get('table').contains('tr', 'María').within(() => {
        cy.get('span').contains('Inactivo').should('be.visible');
      });
  
      // Reactivate personnel
      cy.get('table').contains('tr', 'María').within(() => {
        cy.get('span').contains('Inactivo').click();
      });
      cy.contains('button', 'Activar').click();
      cy.get('table').contains('tr', 'María').within(() => {
        cy.get('span').contains('Activo').should('be.visible');
      });
    });
  
    it('should paginate through healthcare personnel', () => {
      cy.get('table').find('tr').should('have.length.gt', 1);
      cy.get('button[aria-label="Go to next page"]').click();
      cy.get('table').find('tr').should('have.length.gt', 1);
    });
  
    it('should change rows per page', () => {
      cy.get('select[aria-label="rows per page"]').select('10');
      cy.get('table').find('tr').should('have.length.lte', 12); // 10 rows + header or less
    });
  
    it('should navigate to healthcare personnel details', () => {
      cy.get('table').contains('td', 'María Sánchez').click();
      cy.url().should('include', '/fcc-personal-salud/');
      cy.contains('Detalles del Personal de Salud').should('be.visible');
    });
  
    it('should open and close the add personnel modal', () => {
      cy.contains('button', 'Personal').click();
      cy.get('.MuiModal-root').should('be.visible');
      cy.get('h4').should('contain', 'Añadir Personal de Salud')

    });
  
    it('should open and close the edit personnel modal', () => {
      cy.get('table').contains('tr', 'María').within(() => {
        cy.get('button').find('svg[data-testid="EditIcon"]').click();
      });
      cy.get('h4').should('contain', 'Editar Personal de Salud')      
    });
  });