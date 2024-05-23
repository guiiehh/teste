/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', ()=> {
    beforeEach (function(){
        cy.visit('src/index.html');
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, ';
        cy.get('input[id="firstName"]').type('Gabriel Vitor')
        cy.get('input[id="lastName"]').type('Siqueira')
        cy.get('input[id="email"]').type('gabrielvitorsiqueira53@gmail.com')
        cy.get('input[id="phone"]').type('998645631')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type=submit]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('input[id="firstName"]').type('Gabriel Vitor')
        cy.get('input[id="lastName"]').type('Siqueira')
        cy.get('input[id="email"]').type('gabrielvitorsiqueira53@gmail,com')
        cy.get('input[id="phone"]').type('998645631')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type=submit]').click()

        cy.get('.error').should('be.visible')
    })

    it('testar se o campo telefone nao recebe uma string', function(){
        cy.get('input[id="phone"]')
        .get('abc')
        .should('have.value', '')
    })

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('input[id="firstName"]').type('Gabriel Vitor')
        cy.get('input[id="lastName"]').type('Siqueira')
        cy.get('input[id="email"]').type('gabrielvitorsiqueira53@gmail,com')
        cy.get('input[id="phone"]').type()

        cy.get('.error').should('be.visible')
    })
  })