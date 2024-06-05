// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Mauro Moreno')
        cy.get('#lastName').type('Kühl Neto')
        cy.get('#email').type('teste@tarolho.com')
        cy.get('#phone').type('998502232')
        cy.get('select').select('Cursos')
        cy.get('textarea').type('Quero comprar uma saveiro rebaixada').wait(0)
        cy.get('.button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Mauro Moreno')
        cy.get('#lastName').type('Kühl Neto')
        cy.get('#email').type('testeroni')
        cy.get('#phone').type('998502232')
        cy.get('select').select('Cursos')
        cy.get('textarea').type('Quero comprar uma saveiro rebaixada').wait(0)
        cy.get('.button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it.only('campo de telefone fica vazio caso seja digitado um valor não numérico', function() {
        cy.get('#phone').type('tetaroni').should('have.text', '')
    })

    /* it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        
    }) */

    it.only('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').type('Mauro Moreno').should('have.value', 'Mauro Moreno')
            cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').type('Kühl Neto').should('have.value', 'Kühl Neto')
            cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').type('teste@tarolho.com').should('have.value', 'teste@tarolho.com')
            cy.get('#email').clear().should('have.value', '')
        cy.get('#phone').type('998502232').should('have.value', '998502232')
            cy.get('#phone').clear().should('have.value', '')
    })
  })
  