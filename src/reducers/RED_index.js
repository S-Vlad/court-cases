import { combineReducers } from 'redux';

import lawsuits from './RED_lawsuits';
import documents from './RED_documents';
import participants from './RED_participants';


export default combineReducers({
  lawsuits,
  documents,
  participants,
});