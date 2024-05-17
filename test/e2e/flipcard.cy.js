
describe('Flipcard', function () {
  beforeEach(function () {
    cy.getData();
    cy.visit('/');
  });

  it('should display the flipcard component', function () {
    // Get flipcard components and loop through each one
    const flipcardComponents = this.data.components.filter(component => component._component === 'flipcard');
    flipcardComponents.forEach(flipcardComponent => {
      cy.visit(`/#/preview/${flipcardComponent._id}`);
      // Retrieve values
      const { body, displayTitle, instruction, _items, _flipType } = flipcardComponent;
      
      const stripHtml = cy.helpers.stripHtml;

      // Basic checks
      cy.testContainsOrNotExists('.flipcard__title', stripHtml(displayTitle));
      cy.testContainsOrNotExists('.flipcard__instruction', stripHtml(instruction));
      cy.testContainsOrNotExists('.flipcard__body', stripHtml(body));

      _items.forEach((item, index) => {
        let { backTitle, backBody, frontImage, _flipDirection } = item;
        cy.get(`.flipcard__item.${_flipDirection}.item-${index}`)
        cy.get('.flipcard__item').eq(index).within(() => {
          cy.testContainsOrNotExists('.flipcard__item-back-title', stripHtml(backTitle));
          cy.testContainsOrNotExists('.flipcard__item-back-body', stripHtml(backBody));
          cy.get('.flipcard__item-frontImage')
            .should('have.attr', 'src', frontImage.src)
            .should('have.attr', 'aria-label', frontImage.alt)
          
          cy.get('.flipcard__item-front').should('be.visible')
          cy.get('.flipcard__item-back').should('not.be.visible')
          
          cy.get('.flipcard__item-back').click()
          
          cy.get('.flipcard__item-front').should('not.be.visible')
          cy.get('.flipcard__item-back').should('be.visible')
          
          cy.get('.flipcard__item-back').click()

          cy.get('.flipcard__item-front').should('be.visible')
          cy.get('.flipcard__item-back').should('not.be.visible')

          cy.get('.flipcard__item-front').click()
        });

        const flippedItemsCount = _flipType === 'allFlip' ? index + 1 : 1
        
        cy.get('.flipcard__flip').should('have.length', flippedItemsCount);
      });
      
      cy.wait(1000); 
    });
  });
});

