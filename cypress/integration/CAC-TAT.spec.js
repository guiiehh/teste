/// <reference types="Cypress" />  

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit( './src/index.html')
    })    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    //it.only -- para executar apenas um teste
    it('Exercício 1 - preenche os campos obrigtórios e envia o formulário', function() {
        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, '
        cy.get('#firstName').type("ricardo")
        cy.get('#lastName').type("veiga")
        cy.get('#email').type("ricardo@gmail.com")
        cy.get('#open-text-area').type(longText, {delay:0}) //como se fosse um crtl v, para agilizar a inserção do texto
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')

    })

    it('Exercício 2 - exibe mensagem de erro ao submeter o formulário com um email com formato inválido', function() {
        
        cy.get('#firstName').type("ricardo")
        cy.get('#lastName').type("veiga")
        cy.get('#email').type("ricardo@gmail,xcom")
        cy.get('#open-text-area').type('teste') 
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Exercício 3 - campo telefone continua vazio quando preenchido com valor não numérico', function() {
    
        cy.get('#phone')
        .type("rgregerg")
        .should('have.value', '')
    })

    it('Exercício 4 - exibe mensagem de erro quando telefone se torna obrigatório mas não é preenchido', function() {
        
        cy.get('#firstName').type("ricardo")
        cy.get('#lastName').type("veiga")
        cy.get('#email').type("ricardo@gmail.com")
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste') 
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Exercício 5 - preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
        .type('ricardo')
        .should('have.value', 'ricardo')
        .clear()
        .should('have.value', '')
        cy.get('#lastName')
        .type('veiga')
        .should('have.value', 'veiga')
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('ricardo@gmail.com')
        .should('have.value', 'ricardo@gmail.com')
        .clear()
        .should('have.value', '')
        cy.get('#phone')
        .type('123456789')
        .should('have.value', '123456789')
        .clear()
        .should('have.value', '')
    })

    it('Exercício 6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Exercício 7 - envia formulário com sucesso usando comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it.only('Exercício 8 - utilizar comando contains', function() {
        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, '
        cy.get('#firstName').type("ricardo")
        cy.get('#lastName').type("veiga")
        cy.get('#email').type("ricardo@gmail.com")
        cy.get('#open-text-area').type(longText, {delay:0}) //como se fosse um crtl v, para agilizar a inserção do texto
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

    })


  })
  