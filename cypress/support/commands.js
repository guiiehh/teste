Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').type('Hudson')
    cy.get('#lastName').type('Henrique')
    cy.get('#email').type('hudson@gmail.com')
    cy.get('#open-text-area').type('me ajude',{delay:0})
    cy.get('button[type="submit"]').click()
})