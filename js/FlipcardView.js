import ComponentView from 'coreViews/componentView';

class FlipcardView extends ComponentView {
  // this is used to set ready status for current component on postRender.
  postRender() {
    this.$('.flipcard__widget').imageready(() => {
      this.reRender();
      this.setReadyStatus();
    });
  }

  // This function called on triggering of device resize and device change event of Adapt.
  // It sets the height of the flipcard component to the first image in the component.
  reRender() {
    const $firstItemImage = this.$('.flipcard__item-frontImage').eq(0);
    const $items = this.$('.flipcard__item');
    const flexBasis = $items.length > 1 ? '49%' : '100%';

    // Reset width so that dimensions can be recalculated
    $items.css({ flexBasis: flexBasis });

    const imageHeight = Math.round($firstItemImage.height());
    const itemWidth = Math.floor($items.eq(0).outerWidth());

    if (imageHeight) {
      $items.height(imageHeight);
    }

    // Responsive margin to make horizontal and vertical gutters equal
    const gutterWidth = itemWidth * 0.04;

    $items.css({
      flexBasis: itemWidth,
      marginBottom: gutterWidth
    });
  }
}

FlipcardView.template = 'flipcard.jsx';

export default FlipcardView;
