/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html') //Visitar a URL da aplicação
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') //Verificação
  })

   //Validando campos obrigatórios
    it('preenche os campos obrigatórios e envia o formulário', function() {
      const longText = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
      cy.get('#firstName').type('Dionara')
      cy.get('#lastName').type('Paiva')
      cy.get('#email').type('email@teste.com')
      cy.get('#open-text-area').type(longText, { delay: 0}) //sobescrevendo o delay default para passar um texto longo
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible')
    })

    //Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
      cy.get('#firstName').type('Dionara')
      cy.get('#lastName').type('Paiva')
      cy.get('#email').type('email@teste,com')
      cy.get('#open-text-area').type('Teste email inválido')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
    })

    //validando valor inválido no campo telefone
    it('campo telefone continua vazio quando preenchido com valor não numérico', function() {
      cy.get('#phone')
        .type('abcdefgh')
        .should('have.value', '')
    })

    //exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário
    it('exibe erro quando o telefone é obrigatório mas não é preenchido antes do envio do formulário', function(){
      cy.get('#firstName').type('Dionara')
      cy.get('#lastName').type('Paiva')
      cy.get('#email').type('email@teste.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('Teste')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
    })

    //preenche e limpa os campos nome, sobrenome, email e telefone
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
      cy.get('#firstName')
        .type('Dionara')
        .should('have.value', 'Dionara')
        .clear()
        .should('have.value', '')
      cy.get('#lastName')
        .type('Paiva')
        .should('have.value', 'Paiva')
        .clear()
        .should('have.value', '')
      cy.get('#email')
        .type('email@teste.com')
        .should('have.value', 'email@teste.com')
        .clear()
        .should('have.value', '')
      cy.get('#phone')
        .type('34991426699')
        .should('have.value', '34991426699')
        .clear()
        .should('have.value', '')
    })

    //exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    })

    //enviar formulário com sucesso usando comando customizado
    it('enviar formulário com sucesso usando comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
    })

    //selecionar um produto (YouTube) por seu texto
    it('selecionar um produto (YouTube) por seu texto', function(){
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    //selecionar um produto (Mentoria) por seu valor (value)
    it('selecionar um produto (Mentoria) por seu valor (value)', function(){
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    //selecionar um produto (Blog) por seu índice
    it('selecionar um produto (Blog) por seu índice', function(){
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    //marcar o tipo de atendimento "Feedback"
    it('marcar o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    //marcar cada tipo de atendimento
    it('marcar cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })

    //marcar ambos checkboxes, depois desmarca o último
    it('marcar ambos checkboxes, depois desmarca o último', function(){
      cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    // Fazendo upload de arquivos com Cypress
    it('selecionar um arquivo da pasta fixtures', function(){
      cy.get('input[type=file]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('selecionar um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type=file]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('selecionar um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type=file]')
        .selectFile('@sampleFile') // @ para identificar que é um alias
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    //Lidando com links que abrem em outra aba
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    //acessar a página da política de privacidade removendo o target e então clicando no link
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('Talking About Testing').should('be.visible')
    })
})

