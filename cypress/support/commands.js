// Comandos customizados
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Karinny')
    cy.get('#lastName').type('Lemos')
    cy.get('#email').type('ka@lemos.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})