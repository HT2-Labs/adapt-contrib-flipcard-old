import components from 'core/js/components';
import FlipcardView from './FlipcardView';
import FlipcardModel from './FlipcardModel';

export default components.register('flipcard', {
  model: FlipcardModel,
  view: FlipcardView
});
