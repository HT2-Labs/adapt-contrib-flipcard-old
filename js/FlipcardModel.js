import ItemsComponentModel from 'core/js/models/itemsComponentModel';

export default class FlipcardModel extends ItemsComponentModel {

  init() {
    super.init();
    this.set('setVisited', this.setVisited.bind(this));
  }

  // This function will set the visited status for particular flipcard item.
  setVisited(index) {
    const item = this.get('_items')[index];
    item._isVisited = true;
    this.checkCompletionStatus();
  }
}
