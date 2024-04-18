const form = {
  name: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  howWeMayHelp: 'Testing message...',
};

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', function () {
    cy.get('input[id="firstName"]').should('be.visible').type(form.name).should('have.value', form.name)
    cy.get('input[id="lastName"]').should('be.visible').type(form.lastName).should('have.value', form.lastName)

  });
});
