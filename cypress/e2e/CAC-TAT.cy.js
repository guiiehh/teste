const form = {
  name: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  number: '123456789',
  howWeMayHelp: 'Testing message...',
};

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('input[id="firstName"]')
      .should('be.visible')
      .type(form.name, { delay: 0 })
      .should('have.value', form.name);
    cy.get('input[id="lastName"]')
      .should('be.visible')
      .type(form.lastName, { delay: 0 })
      .should('have.value', form.lastName);
    cy.get('input[id="email"]')
      .should('be.visible')
      .type(form.email, { delay: 0 })
      .should('have.value', form.email);
    cy.get('textarea[id="open-text-area"]')
      .should('be.visible')
      .type(form.howWeMayHelp, { delay: 0 })
      .should('have.value', form.howWeMayHelp);
    cy.get('button[type="submit"]').should('be.visible').click();
    cy.get('span[class="success"]').should('be.visible');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida ', () => {
    cy.get('button[type="submit"]').should('be.visible').click();
    cy.get('span[class="error"]').should('be.visible');
  });

  it('somente números são aceitos', () => {
    cy.get('#phone').should('be.visible').type(form.email).should('have.value', '');
  });
});
