Cypress.Commands.add('fillMandatoryFieldsAndSubimit', function(){ //primeiro argumento é o nome do comando customizado e o segundo é a função 
    cy.get('#firstName').type('Alexia')
    cy.get('#lastName').type('Karine')
    cy.get('#email').type('alexia@gmail.com')
    cy.get('#open-text-area').type('Oi, eu sou o Goku')
    cy.contains('button', 'Enviar').click()
})