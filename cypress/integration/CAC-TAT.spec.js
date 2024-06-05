// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('input[type="text"][name="firstName"]')
            .should('be.visible')
            .type('Mauro Moreno')
            .should('have.value', 'Mauro Moreno')

        cy.get('input[type="text"][name="lastName"]')
            .should('be.visible')
            .type('Kühl Neto')
            .should('have.value', 'Kühl Neto')

        cy.get('input[type="email"][name="email"]')
            .should('be.visible')
            .type('teste@tarolho.com')
            .should('have.value', 'teste@tarolho.com')

        cy.get('input[type="number"][name="phone"]')
            .should('be.visible')
            .type('998502232')
            .should('have.value', '998502232')

        cy.get('select')
            .select('Cursos')
            .should('have.value', 'cursos')

        cy.get('textarea')
            .should('be.visible')
            .type('Quero comprar uma saveiro rebaixada')
            .wait(0)
            .should('have.value', 'Quero comprar uma saveiro rebaixada')

        cy.get('button[type="submit"]')
            .should('be.visible')
            .click()

        cy.get('span[class="success"]')
            .should('be.visible')
    })
  })
  