import components from 'core/js/components';
import FlipcardView from './FlipcardView';
import FlipcardModel from './FlipcardModel';

// Faking a PR for test run action. Please ignore
export default components.register('flipcard', {
  model: FlipcardModel,
  view: FlipcardView
});
