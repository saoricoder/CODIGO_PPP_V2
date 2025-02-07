Cypress.Commands.add('login', () => {
    cy.session('user', () => {
      cy.visit('/')
      cy.get('input[name="email"]').type(Cypress.env('USER_EMAIL'))
      cy.get('input[name="password"]').type(Cypress.env('USER_PASSWORD'))
      cy.get('button[type="submit"]').click()
      cy.url().should('include', '/fcc-menu-principal')
      cy.get('.MuiDrawer-paper').should('exist')
    }, {
      validate: () => {
        cy.getCookie('auth_token').should('exist')
      }
    })
  })