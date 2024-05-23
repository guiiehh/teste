Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
      cy.get('#firstName').type('Dionara')
      cy.get('#lastName').type('Paiva')
      cy.get('#email').type('email@teste.com')
      cy.get('#open-text-area').type('Text')
      cy.contains('button','Enviar').click()
})