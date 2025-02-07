// cypress/e2e/01-paciente-tests/vista-paciente.cy.js

describe('Patient Management', () => {
    beforeEach(() => {
        // Iniciar sesión
        cy.login();
      cy.visit('/fcc-pacientes');
      // Esperar a que la página se cargue completamente
      cy.get('table').should('be.visible');
    });
  
    it('should search for a patient', () => {
      cy.get('input[type="text"]').clear().type('Ana');
      cy.get('table').contains('td', 'Ana').should('be.visible');
    });
  
    it('should filter active patients only', () => {
        cy.get('input[type="checkbox"]').click();
      cy.get('input[type="checkbox"]').check({force: true});
      cy.get('table').find('tr').should('have.length.gt', 1);
      cy.get('table').contains('Inactivo').should('not.exist');
    });
      
    it('should deactivate and reactivate a patient', () => {
      // Desactivar paciente
      cy.get('table').contains('tr', 'Ana').within(() => {
        cy.get('span').contains('Activo').click();
      });
      cy.contains('button', 'Desactivar').click();
      cy.get('input[type="checkbox"]').click();
      cy.get('table').contains('tr', 'Ana').within(() => {
        cy.get('span').contains('Inactivo').should('be.visible');
      });

      // Reactivar paciente
      cy.get('table').contains('tr', 'Ana').within(() => {
        cy.get('span').contains('Inactivo').click();
      });
      cy.contains('button', 'Activar').click();
      cy.get('table').contains('tr', 'Ana').within(() => {
        cy.get('span').contains('Activo').should('be.visible');
      });
    });
  
    it('should paginate through patients', () => {
      cy.get('table').find('tr').should('have.length.gt', 1);
      cy.get('button[aria-label="Go to next page"]').click();
      cy.get('table').find('tr').should('have.length.gt', 1);
    });
  
    it('should change rows per page', () => {
      cy.get('select[aria-label="rows per page"]').select('10');
      cy.get('table').find('tr').should('have.length.lte', 12); // 10 rows + header or less
    });
  
    it('should navigate to patient details', () => {
      cy.get('table').contains('td', 'Pedro López').click();
      cy.url().should('include', '/fcc-pacientes/');
      cy.contains('Detalles del Paciente').should('be.visible');
    });
  });