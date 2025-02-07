describe('Login Functionality', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display login form', () => {
    cy.get('form').should('be.visible')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('should login with valid credentials', () => {
    cy.get('input[name="email"]').type('admin@admin.com')
    cy.get('input[name="password"]').type('12345678')
    cy.get('button[type="submit"]').click()

    // Asumiendo que después del login exitoso, se redirige a una página de dashboard
    cy.url().should('include', '/fcc-menu-principal')
    cy.get('h4').should('contain', 'Panel de Control')
  })

  it('should show error with invalid credentials', () => {
    cy.get('input[name="email"]').type('invaliduser')
    cy.get('input[name="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()

    cy.get('.MuiAlert-message').should('be.visible')
    cy.get('.MuiAlert-message').should('contain', 'Credenciales incorrectas')
  })
})