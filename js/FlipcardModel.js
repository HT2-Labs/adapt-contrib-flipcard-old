import ItemsComponentModel from 'core/js/models/itemsComponentModel';
import logging from 'core/js/logging';

export default class FlipcardModel extends ItemsComponentModel {

  init() {
    super.init();
    this.set('setVisited', this.setVisited.bind(this));
  }

  // This function will set the visited status for particular flipcard item.
  setVisited(index) {
    const child = this.getChildren()?.models?.[index] || null;
    if (!child) {
      logging.warn(`Flipcard item not found for index 'index'`);
      return;
    }

    child.set('_isVisited', true);
    this.checkCompletionStatus();
  }
}
