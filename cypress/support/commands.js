Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').should('be.visible').type("Rodrigo")
    cy.get('#lastName').should('be.visible').type("Bauernfeind")
    cy.get('#email').should('be.visible').type("ro.bauerr@gmail.com")
    cy.get('#open-text-area').should('be.visible').type("Escrevendo alguma coisa no campo Como podemos te ajudar??")
    cy.get('.button').should('be.visible').click()
})