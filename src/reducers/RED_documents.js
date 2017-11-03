import { GET_DOCUMENTS_SUCCESS, EDIT_DOCUMENT, EDIT_DOCUMENT_CANCEL, SAVE_DOCUMENT, ADD_DOCUMENT } from '../constants/CON_documents.js';


const initialState = {
  data: [],
  edit: false
};

export default function documents(state = initialState, action) {
  switch(action.type) {
    case GET_DOCUMENTS_SUCCESS:
      return {...state, data: action.payload, edit: false};

    case EDIT_DOCUMENT:
      return {...state, edit: true};

    case EDIT_DOCUMENT_CANCEL:
      return {...state, edit: false};

    case SAVE_DOCUMENT:
      return {...state, edit: false, data: action.payload};

    case ADD_DOCUMENT:
      return {...state, data: action.payload};

    default:
      return state;
  }
}