import { GET_DOCUMENTS_SUCCESS } from '../constants/CON_documents.js';


const initialState = {};

export default function documents(state = initialState, action) {
  switch(action.type) {
    case GET_DOCUMENTS_SUCCESS:
      return {...state, data: action.payload};

    default:
      return state;
  }
}