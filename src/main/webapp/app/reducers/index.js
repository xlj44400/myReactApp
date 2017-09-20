import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import locale from './locale';
import authentication from './authentication';
import administration from './administration';
import sidebar from './sidebar';

export default combineReducers({
  authentication,
  locale,
  routing,
  administration,
  sidebar
});
