// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit("./src/index.html")
    })

    it('verifica o título da aplicação', function() {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() { //ex 1
        cy.get('#firstName').type('Alexia')
        cy.get('#lastName').type('Karine')
        cy.get('#email').type('alexia@gmail.com')
        cy.get('#open-text-area').type('Oi, eu sou o Goku')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')

    })

    it('adicionando o delay 0 na digitação de textos', function() { // ex 2
        const longText = 'Oi, eu sou o Goku, Oi, eu sou o Goku, Oi, eu sou o Goku, Oi, eu sou o Goku, Oi, eu sou o Goku, Oi, eu sou o Goku, Oi, eu sou o Goku, Oi, eu sou o Goku, Oi, eu sou o Goku, Oi, eu sou o Goku, Oi, eu sou o Goku, '
        cy.get('#firstName').type('Alexia')
        cy.get('#lastName').type('Karine')
        cy.get('#email').type('alexia@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibir mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', function(){ // ex 3
        cy.get('#firstName').type('Alexia')
        cy.get('#lastName').type('Karine')
        cy.get('#email').type('alexia@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('caso um valor não-numérico seja incluso no campo telefone, seu valor continuará vazio', function() { // ex 4
        cy.get('#firstName').type('Alexia')
        cy.get('#lastName').type('Karine')
        cy.get('#email').type('alexia@gmail.com')
        cy.get('#phone')
            .type('ssss')
            .should('have.value', '')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', function (){ //ex 5
        cy.get('#firstName').type('Alexia')
        cy.get('#lastName').type('Karine')
        cy.get('#email').type('alexia@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function (){ //ex 6
        cy.get('#firstName')
            .type('Alexia')
            .should('have.value', 'Alexia')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Karine')
            .should('have.value', 'Karine')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('alexia@gmail.com')
            .should('have.value', 'alexia@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('12982657207')
            .should('have.value', '12982657207')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click() 
        cy.get('.error').should('be.visible')
        
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function (){ //ex 7
        cy.get('button[type="submit"]').click()  
        cy.get('.error').should('be.visible')
        
    })

    it('envia formulário com sucesso usando um comando customizado', function(){ //ex 8
        cy.fillMandatoryFieldsAndSubimit()
        cy.get('.success').should('be.visible')
    }) 

    it('alterar todos os dados locais onde identificamos o botão para porterior clique usando o cy.contains', function (){ //ex 9
        
    }) 
    
    //Campos de seleção suspensa  
    it('seleciona um produto(Youtube) por seu texto', function(){ //ex 10
        cy.get('#product')
         .select('YouTube')
         .should('have.value', 'youtube')
    })

    it('seleciona um produto(Mentoria) por seu valor', function(){ //ex 10
        cy.get('#product')
         .select('mentoria')
         .should('have.value', 'mentoria')
    })

    it('seleciona um produto(Blog) por seu índice', function(){ //ex 12
        cy.get('#product')
         .select(1)
         .should('have.value', 'blog')
    })

    //marcando inputs do tipo Radio
    it('marca o tipo de atendimento "Feedback"', function(){ //ex 13
        cy.get('input[type = "radio"][value = "feedback"]')
         .check()
         .should('have.value', 'feedback')
    })

    it('marcar cada tipo de atendimento', function (){ //ex 14
        cy.get('input[type = "radio"]')
         .should('have.length', 3)
         .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
         })

    })

    //Marcando e desmarcando inputs do tipo checkbox
    it('marca ambos checkboxes, depois desmarca o último', function(){ // ex 15
        cy.get('input[type=checkbox]')
         .check()
         .should('be.checked')
         .last()
         .uncheck()
         .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido com o .check',function(){ // ex 16
        cy.get('#firstName').type('Alexia')
        cy.get('#lastName').type('Karine')
        cy.get('#email').type('alexia@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('seleciona um arquivo da pasta fixtures', function(){ // ex 17
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value') //verifica se ele não tem valor ainda
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){ //confere se o nome do arquivo está correto
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando uma drag-and-drop', function(){ // ex 18
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value') //verifica se ele não tem valor ainda
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}) // simula que está arrastando o arquivo pra área de upload
        .should(function($input){ //confere se o nome do arquivo está correto
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){ // ex 19
        cy.fixture('example.json').as('sampleFile') 
        cy.get('input[type="file"]#file-upload')
        .selectFile('@sampleFile')
        .should(function($input){ //confere se o nome do arquivo está correto
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    //lidando com links que abrem outra abado navegador
    it('Verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function(){ //ex 20
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it("acessa a página da politica de privacidade removendo o target e então clicando no link", function (){ //ex 21
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

  })
  
