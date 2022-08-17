import components from 'core/js/components';
import FlipcardView from './flipcardView';
import FlipcardModel from './flipcardModel';

export default components.register('flipcard', {
  model: FlipcardModel,
  view: FlipcardView
});
