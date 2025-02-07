// cypress/integration/usuarios_and_perfil_spec.js

describe('Usuarios and Perfil Views', () => {
    beforeEach(() => {
      cy.login(); // Assuming you have a custom command for login
    });
  
    describe('Usuarios View', () => {
      beforeEach(() => {
        cy.visit('/fcc-usuarios');
        cy.intercept('GET', 'https://newfreshstudio.com:5001/api/fcc/users').as('getUsuarios');
        cy.wait('@getUsuarios');
      });
  
      it('should load the Usuarios component', () => {
        cy.get('h5').contains('Usuarios').should('be.visible');
        cy.get('button').contains('Agregar usuario').should('be.visible');
      });
  
      it('should allow searching for users', () => {
        cy.get('input[placeholder="Buscar usuarios..."]').type('John');
        cy.get('.MuiTableBody-root .MuiTableRow-root').should('have.length.gt', 0);
      });
  
      it('should open the add user modal', () => {
        cy.get('button').contains('Agregar usuario').click();
        cy.get('.MuiDialog-root').should('be.visible');
      });
  
      it('should sort users when clicking on table headers', () => {
        cy.get('.MuiTableHead-root .MuiTableCell-root').contains('Correo electrónico').click();
        // Add assertions here to check if sorting worked
      });
  
      it('should allow editing a user', () => {
        cy.get('.MuiTableBody-root .MuiTableRow-root').first().find('button').contains('edit').click();
        cy.get('input[value="PersonalSalud"]').should('be.visible');
        cy.get('button').contains('save').click();
        // Add assertions to check if the edit was successful
      });
  
      it('should allow activating/deactivating a user', () => {
        cy.get('.MuiTableBody-root .MuiTableRow-root').first().find('.MuiChip-root').click();
        // Add assertions to check if the status changed
      });
  
      it('should allow deleting a user', () => {
        cy.get('.MuiTableBody-root .MuiTableRow-root').first().find('button').contains('delete').click();
        // Add assertions to check if the user was removed from the list
      });
  
      it('should handle pagination', () => {
        cy.get('.MuiTablePagination-root').should('exist');
        cy.get('.MuiTablePagination-actions button').last().click();
        // Add assertions to check if the page changed
      });
    });
  
   
  });