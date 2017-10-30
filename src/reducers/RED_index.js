import { combineReducers } from 'redux';
// import documents from './RED_documents.js';
import lawsuits from './RED_lawsuits.js';
import documents from './RED_documents.js';


export default combineReducers({
  lawsuits,
  documents
});