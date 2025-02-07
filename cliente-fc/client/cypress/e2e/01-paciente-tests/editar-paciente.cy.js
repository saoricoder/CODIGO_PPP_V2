describe('Patient Add', () => {
    beforeEach(() => {
        // Iniciar sesión
        cy.login();
        cy.visit('/fcc-pacientes');
        // Esperar a que la página se cargue completamente
        cy.get('table').should('be.visible');
    });

    it('should edit an existing patient', () => {
        // Buscar el paciente a editar
        cy.get('input[type="text"]').clear().type('Ana');
        cy.get('table').contains('tr', 'Ana').within(() => {
          cy.get('button').within(() => {
            cy.get('svg').click();
          });
        });
    
        // Paso 1: Editar Información personal
        cy.get('input[name="nombre_paciente"]').clear().type('Ana María');
        cy.get('input[name="apellidos_paciente"]').clear().type('García López');
    
        // Editar Tipo de Identificación
        cy.contains('label', 'Identificación')
          .closest('.MuiAutocomplete-root')
          .within(() => {
            cy.get('input').click();
          });
        cy.get('.MuiAutocomplete-popper')
          .should('be.visible')
          .find('.MuiAutocomplete-option')
          .eq(1) // Seleccionar la segunda opción para cambiar
          .click();
    
        cy.get('input[name="direccion_paciente"]').clear().type('Avenida Principal 456');
        cy.get('input[name="dni_paciente"]').clear().type('987654321');
        cy.get('input[name="telefono_paciente"]').clear().type('593987654321');
        cy.get('input[name="email_paciente"]').clear().type('ana.maria@email.com');
        cy.contains('button', 'Siguiente').click();
    
        // Paso 2: Editar Información médica
        cy.get('input[name="telefono_cuidador"]').clear().type('593912345678');
        cy.get('input[name="familiar_cuidador"]').clear().type('María López');
    
        // Editar Género
        cy.contains('label', 'Género')
          .closest('.MuiAutocomplete-root')
          .within(() => {
            cy.get('input').click();
          });
        cy.get('.MuiAutocomplete-popper')
          .should('be.visible')
          .find('.MuiAutocomplete-option')
          .eq(1) // Seleccionar la segunda opción para cambiar
          .click();
    
        // Editar Parentesco
        cy.contains('label', 'Parentesco')
          .closest('.MuiAutocomplete-root')
          .within(() => {
            cy.get('input').click();
          });
        cy.get('.MuiAutocomplete-popper')
          .should('be.visible')
          .find('.MuiAutocomplete-option')
          .eq(1) // Seleccionar la segunda opción para cambiar
          .click();
    
        // Editar Tipo de Sangre
        cy.contains('label', 'Sangre')
          .closest('.MuiAutocomplete-root')
          .within(() => {
            cy.get('input').click();
          });
        cy.get('.MuiAutocomplete-popper')
          .should('be.visible')
          .find('.MuiAutocomplete-option')
          .eq(1) // Seleccionar la segunda opción para cambiar
          .click();
    
        // Editar Fecha de Nacimiento
        cy.contains('label', 'Fecha de Nacimiento')
          .closest('.MuiFormControl-root')
          .within(() => {
            cy.get('button').click();
          });
    
        cy.get('.MuiPickersPopper-root')
          .should('be.visible')
          .within(() => {
            // Cambiar a la vista de año
            cy.get('button[aria-label="calendar view is open, switch to year view"]')
              .click({ force: true });
            
            // Seleccionar el año 2010
            cy.contains('.MuiPickersYear-yearButton', '2010')
              .click({ force: true });

            // Esperar a que la vista de mes sea visible
            cy.get('.MuiDayCalendar-header').should('be.visible');
            
            // Navegar al mes de agosto (si es necesario)
            cy.get('button[title="Previous month"]')
              .click({ multiple: true, force: true });

            // Seleccionar el día 15
            cy.contains('button[role="gridcell"]', '15')
              .click({ force: true });
          });
    
        cy.contains('button', 'Siguiente').click();
    
        // Paso 3: Editar Documentos
        cy.get('textarea[name="biografia_paciente"]').clear().type('Ana María es una paciente actualizada.');
    
        cy.contains('button', 'Guardar').click();
        //cy.contains('Paciente actualizado exitosamente').should('be.visible');
    });
});