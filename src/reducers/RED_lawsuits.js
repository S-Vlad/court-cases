import { /*GET_LAWSUITS_REQUEST,*/ GET_LAWSUITS_SUCCESS, FIND_LAWSUITS } from '../constants/CON_lawsuits.js';


const initialState = {
  /*fetching: false*/
}

export default function lawsuits(state = initialState, action) {
  switch(action.type) {
    // case GET_LAWSUITS_REQUEST:
    //   return {...state, fetching: true};

    case GET_LAWSUITS_SUCCESS:
      return {...state, data: action.payload/*, fetching: false*/};

    case FIND_LAWSUITS:
      return {...state, data: action.payload};

    default:
      return state;
  }
}