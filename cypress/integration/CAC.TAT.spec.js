/// <reference types="Cypress" />

// O bloco describe define a suíte de testes e o bloco it define o caso de teste
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste,Teste, teste, teste, teste, teste, teste, teste,Teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Karinny')
        cy.get('#lastName').type('Lemos')
        cy.get('#email').type('ka@lemos.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação errada', function() {
            cy.get('#firstName').type('Karinny')
            cy.get('#lastName').type('Lemos')
            cy.get('#email').type('ka@lemos,com')
            cy.get('#open-text-area').type('Teste')
            cy.get('button[type="submit"]').click()

            cy.get('.error').should('be.visible')
  })
  it ('campo telefone continua vazio quando preenchido com valor não numérico',function(){
    cy.get('#phone')
        .type('abcd') //Condição: como não aceita vazio, logo, o should abaixo vai ser vazio ''
        .should('have.value', '')
  })
  it ('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    // Primeiro preenche todos os campos com dados válidos 
    cy.get('#firstName').type('Karinny')
    cy.get('#lastName').type('Lemos')
    cy.get('#email').type('ka@lemos.com')

    cy.get('#phone-checkbox').check() //Ao clicar o telefone se torna obrigatório

    cy.get('#open-text-area').type('Teste')

    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible') //Como não foi encontrado tel o erro aparece

  })

  it ('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    //O objetivo aqui é limpar e apagar 
    cy.get('#firstName')
    .type('Karinny')
    .should('have.value', 'Karinny')
    .clear()
    .should('have.value', '')

    cy.get('#lastName')
    .type('Lemos')
    .should('have.value', 'Lemos')
    .clear()
    .should('have.value', '')

    cy.get('#email')
    .type('karinny@gmail.com')
    .should('have.value', 'karinny@gmail.com')
    .clear()
    .should('have.value', '')
  })

  it ('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it ('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product')//melhor usar um id, mais especifico
    .select('YouTube')
    .should('have.value','youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })
  it ('seleciona um produto (Blog) por seu índice', function(){
    cy.get('#product')
     .select(1)
     .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', function(){
    cy.get('input[type ="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function(){
    cy.get('input[type ="radio"]')
    .should('have.length', 3)
    .each(function($radio){
      cy.wrap($radio).check() //empacota
      cy.wrap($radio).should('be.checked') //manda um check e vê se tá marcado
    })
  })
  it('marca ambos checkboxes, depois desmarca o último', function(){
    cy.get('input[type ="checkbox"]')
    .check()
    .last()
    .uncheck()
    .should('not.be.checked')
  })

  it ('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type ="file"]')
    .should('not.have.value')//ainda nao tem valor
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}) //Fez upload, passou o caminho. Action é "arrastar o arquivo"
    .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json') //Verifica que o arquivo adicionado é o que vc queria mesmo
    })
  })

  //Usando alias = renomeando um arquivo
  it.only ('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile') //Nome que você deu ao arquivo
    cy.get('input[type ="file"]')
      .selectFile('@sampleFile')
      
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')

      })
})

// Um atributo target com o valor de _blank abre o documento vinculado em uma nova janela ou aba.
// Um atributo target com o valor de _self abre o documento vinculado no mesmo frame no qual ele foi clicado
it ('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
  cy.get ('#privacy a').should('have.attr', 'target','_blank')
})

it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
  cy.get('#privacy a')
  .invoke('removeAttr', 'target') //IMPORTANTE: Aqui ele esta removendo o atributo target que permite abrir outra aba, sendo que o cypress não consegue fazer ações em outra aba
  .click() 
  cy.contains('Talking About Testing').should('be.visible')
})


//Optei por não estudar o módulo de 3 aulas de dispositivos móveis


}) 