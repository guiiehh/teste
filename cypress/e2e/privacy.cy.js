describe('should privacy page be visible', () => {
  it.only('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .should('be.visible')
      .should('have.attr', 'target', '_blank')
      .invoke('removeAttr', 'target')
      .click()
    cy.get('#white-background > :nth-child(5)').contains(
      'Talking About Testing',
    )
  })
})
