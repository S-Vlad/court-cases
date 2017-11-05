import { combineReducers } from 'redux';
import lawsuits from './RED_lawsuits.js';
import documents from './RED_documents.js';
import participants from './RED_participants.js';


export default combineReducers({
  lawsuits,
  documents,
  participants
});