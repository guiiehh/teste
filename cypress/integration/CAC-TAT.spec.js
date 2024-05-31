///<reference types="Cypress" />

describe('Central de atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html')        
    })

    const firstName = 'Rodrigo';
    const lastName = "Bauernfeind";
    const email = "ro.bauerr@gmail.com";
    const phone =  '48999355870'; 
    
    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').should('be.visible').type("Rodrigo")
        cy.get('#lastName').should('be.visible').type("Bauernfeind")
        cy.get('#email').should('be.visible').type("ro.bauerr@gmail.com")
        cy.get('#open-text-area').should('be.visible').type("Escrevendo alguma coisa no campo Como podemos te ajudar??")
        cy.get('.button').should('be.visible').click()
        cy.get('.success').should('be.visible')
    })

    it('EE1-Preenche os campos obrigatórios e envia o formulário - com delay', function() {
        cy.get('#firstName').should('be.visible').type("Rodrigo")
        cy.get('#lastName').should('be.visible').type("Bauernfeind")
        cy.get('#email').should('be.visible').type("ro.bauerr@gmail.com")
        cy.get('#open-text-area').should('be.visible').type("Explica pro Product Onwer que a otimização de performance da renderização do DOM complexificou o merge no fechamento automático das tags.", {"delay": 0})
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.get('.success').should('be.visible')
    })

    it('EE2-Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#email').should('be.visible').type("ro.bauerrgmail.com", {"delay": 0})
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.get('.error').should('be.visible')
    })
   
    it('EE3-O campo de telefone só aceita números', function() {
        cy.get('#phone')
          .type("letras")
          .should('have.value', '')
        })

    it('EE4-Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').should('be.visible').type("Rodrigo")
        cy.get('#lastName').should('be.visible').type("Bauernfeind")
        cy.get('#email').should('be.visible').type("ro.bauerr@gmail.com")
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').should('be.visible').type("Explica pro Product Onwer que a otimização de performance da renderização do DOM complexificou o merge no fechamento automático das tags.", {"delay": 0})
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.get('.error').should('be.visible')
    })

    it('EE5-Preenche e limpa os campos Nome, Sobrenome, e-mail e telefone', function () {
        cy.get('#firstName')
          .type(firstName, {"delay": 0})
          .should('have.value', firstName)
          .clear()
          .should('have.value', '')
        
          cy.get('#lastName')
          .type(lastName, {"delay": 0})
          .should('have.value', lastName)
          .clear()
          .should('have.value', '')

        cy.get('#email')
          .type(email, {"delay": 0})
          .should('have.value', email)  
          .clear()
          .should('have.value', '')

        cy.get('#phone')
          .type(phone, {"delay": 0})
          .should('have.value', phone)
          .clear()
          .should('have.value', '')
    })

    it('EE6-Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.get('.error').should('be.visible')
    })

    it('EE7-Envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })   
    
    it('EE8-Usando o cy.contains()', function(){
        cy.get('#firstName').should('be.visible').type("Rodrigo")
        cy.get('#lastName').should('be.visible').type("Bauernfeind")
        cy.get('#email').should('be.visible').type("ro.bauerr@gmail.com")
        cy.get('#open-text-area').should('be.visible').type("Escrevendo alguma coisa no campo Como podemos te ajudar??")
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

})