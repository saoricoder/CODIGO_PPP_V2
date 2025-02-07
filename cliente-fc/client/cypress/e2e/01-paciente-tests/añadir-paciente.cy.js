describe('Patient Add', () => {
    beforeEach(() => {
        // Iniciar sesión
        cy.login();
      cy.visit('/fcc-pacientes');
      // Esperar a que la página se cargue completamente
      cy.get('table').should('be.visible');
    });

it('should add a new patient', () => {
    cy.contains('button', 'Paciente').click();
    
    // Paso 1: Información personal
    cy.get('input[name="nombre_paciente"]').type('Ana');
    cy.get('input[name="apellidos_paciente"]').type('García');
    
    // Tipo de Identificación
    cy.contains('label', 'Identificación')
      .closest('.MuiAutocomplete-root')
      .within(() => {
        cy.get('input').click();
      });
    cy.get('.MuiAutocomplete-popper')
      .should('be.visible')
      .find('.MuiAutocomplete-option')
      .first()
      .click();
  
    // Nacionalidad
    cy.contains('label', 'Nacionalidad')
      .closest('.MuiAutocomplete-root')
      .within(() => {
        cy.get('input').click();
      });
    cy.get('.MuiAutocomplete-popper')
      .should('be.visible')
      .find('.MuiAutocomplete-option')
      .first()
      .click();
  
    cy.get('input[name="direccion_paciente"]').type('Calle Principal 123');
    cy.get('input[name="dni_paciente"]').type('1234567890');
    cy.get('input[name="telefono_paciente"]').type('962944605');
    cy.get('input[name="email_paciente"]').type('ana.garcia@email.com');
    cy.contains('button', 'Siguiente').click();
      // Paso 2: Información médica


    cy.get('input[name="telefono_cuidador"]').type('987654322');
    cy.get('input[name="familiar_cuidador"]').type('Juan García');

    cy.contains('label', 'Género')
      .closest('.MuiAutocomplete-root')
      .within(() => {
        cy.get('input').click();
      });
    cy.get('.MuiAutocomplete-popper')
      .should('be.visible')
      .find('.MuiAutocomplete-option')
      .first()
      .click();  

      cy.contains('label', 'Parentesco')
      .closest('.MuiAutocomplete-root')
      .within(() => {
        cy.get('input').click();
      });
    cy.get('.MuiAutocomplete-popper')
      .should('be.visible')
      .find('.MuiAutocomplete-option')
      .first()
      .click();   

      cy.contains('label', 'Sangre')
      .closest('.MuiAutocomplete-root')
      .within(() => {
        cy.get('input').click();
      });
    cy.get('.MuiAutocomplete-popper')
      .should('be.visible')
      .find('.MuiAutocomplete-option')
      .first()
      .click();

// Encontrar el campo de fecha de nacimiento y abrirlo
cy.contains('label', 'Fecha de Nacimiento')
  .closest('.MuiFormControl-root')
  .within(() => {
    // Hacer clic en el icono del calendario para abrir el selector de fecha
    cy.get('button[aria-label="Choose date"]').click();
  });

// El selector de fecha de MUI se abre en un diálogo
cy.get('.MuiPickersPopper-root')
  .should('be.visible')
  .within(() => {
    // Cambiar a la vista de año
    cy.get('button[aria-label="calendar view is open, switch to year view"]')
      .should('be.visible')
      .click({ force: true });

    // Esperar a que la vista de año sea visible y seleccionar el año 2015
    cy.contains('button', '2015')
      .should('be.visible')
      .click({ force: true });

    // Esperar a que la vista de mes sea visible
    cy.get('.MuiDayCalendar-header').should('be.visible');

    // Navegar al mes de septiembre
    cy.get('button[title="Next month"]')
      .click({ multiple: true, force: true });

    // Seleccionar el día 9
    cy.contains('button', '9')
      .should('be.visible')
      .click({ force: true });
  });

// Verificar que la fecha se ha seleccionado correctamente
cy.get('input[placeholder="MM/DD/YYYY"]').should('have.value', '09/09/2015');

    cy.contains('button', 'Siguiente').click();
  
    // Paso 3: Documentos
    cy.get('textarea[name="biografia_paciente"]').type('Ana es una paciente nueva.');
    // Aquí puedes agregar la lógica para subir archivos si es necesario
  
    cy.contains('button', 'Guardar').click();
    cy.contains('Paciente añadido exitosamente').should('be.visible');
  });

});