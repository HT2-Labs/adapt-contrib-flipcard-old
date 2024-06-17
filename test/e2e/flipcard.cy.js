
describe('Flipcard', function () {
  beforeEach(function () {
    cy.getData();
    cy.visit('/');
  });

  it('should display the flipcard component', function () {
    // Get flipcard components and loop through each one
    const flipcardComponents = this.data.components.filter(component => component._component === 'flipcard');
    const stripHtml = cy.helpers.stripHtml;
    flipcardComponents.forEach(flipcardComponent => {
      cy.visit(`/#/preview/${flipcardComponent._id}`);
      // Retrieve values
      const { body, displayTitle, instruction, _items, _flipType } = flipcardComponent;

      // Basic checks
      cy.testContainsOrNotExists('.flipcard__title', stripHtml(displayTitle));
      cy.testContainsOrNotExists('.flipcard__instruction', stripHtml(instruction));
      cy.testContainsOrNotExists('.flipcard__body', stripHtml(body));

      // Item checks
      _items.forEach((item, index) => {
        let { backTitle, backBody, frontImage, _flipDirection } = item;
        // Check direction class is applied correctly
        cy.get(`.flipcard__item.${_flipDirection}.item-${index}`);

        cy.get('.flipcard__item').eq(index).within(() => {
          // Check item contents are as expected
          cy.testContainsOrNotExists('.flipcard__item-back-title', stripHtml(backTitle));
          cy.testContainsOrNotExists('.flipcard__item-back-body', stripHtml(backBody));
          cy.get('.flipcard__item-frontImage')
            .should('have.attr', 'src', frontImage.src)
            .should('have.attr', 'aria-label', frontImage.alt);

          // Make sure interacting switches the front and back correctly
          cy.get('.flipcard__item-front').should('be.visible');
          cy.get('.flipcard__item-back').should('not.be.visible');

          cy.get('.flipcard__item-front').click({force: true});

          cy.get('.flipcard__item-front').should('not.be.visible');
          cy.get('.flipcard__item-back').should('be.visible');

          cy.get('.flipcard__item-back').click();

          cy.get('.flipcard__item-front').should('be.visible');
          cy.get('.flipcard__item-back').should('not.be.visible');

          cy.get('.flipcard__item-front').click();
        });

        // Check if single flip is selected that other flipcards are unflipped
        const flippedItemsCount = _flipType === 'allFlip' ? index + 1 : 1;

        cy.get('.flipcard__flip').should('have.length', flippedItemsCount);
      });

      cy.wait(1000); 
    });
  });
});

