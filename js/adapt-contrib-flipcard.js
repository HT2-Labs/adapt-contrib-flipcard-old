import Adapt from 'core/js/adapt';
import FlipcardView from './flipcardView';
import FlipcardModel from './flipcardModel';

export default Adapt.register('flipcard', {
  model: FlipcardModel,
  view: FlipcardView
});