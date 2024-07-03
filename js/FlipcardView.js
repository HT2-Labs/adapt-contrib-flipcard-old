import a11y from 'core/js/a11y';
import ComponentView from 'coreViews/componentView';

class FlipcardView extends ComponentView {
  preRender() {
    this.model.set('_items',
      this.model.get('_items').map(obj => ({
        ...obj
      }))
    );
  }

  // this is used to set ready status for current component on postRender.
  postRender() {
    this.$('.flipcard__widget').imageready(() => {
      this.reRender();
      this.setReadyStatus();
    });
  }

  // Used to check if the flipcard should reset on revisit
  checkIfResetOnRevisit() {
    const isResetOnRevisit = this.model.get('_isResetOnRevisit');

    // If reset is enabled set defaults
    if (isResetOnRevisit) {
      this.model.reset(isResetOnRevisit);
    }

    this.model.get('_items').forEach(item => {
      item._isVisited = false;
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

  // This function will set the visited status for particular flipcard item.
  setVisited(index) {
    const item = this.model.get('_items')[index];
    item._isVisited = true;
    this.checkCompletionStatus();
  }

  // This function will be used to get visited states of all flipcard items.
  getVisitedItems() {
    return _.filter(this.model.get('_items'), item => {
      return item._isVisited;
    });
  }

  // This function will check or set the completion status of current component.
  checkCompletionStatus() {
    if (this.getVisitedItems().length !== this.model.get('_items').length) return;
    this.setCompletionStatus();
  }
}

FlipcardView.template = 'flipcard.jsx';

export default FlipcardView;
