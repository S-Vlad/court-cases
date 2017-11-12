import { GET_LAWSUITS_SUCCESS, FIND_LAWSUITS } from '../constants/CON_lawsuits';


const initialState = {};

export default function lawsuits(state = initialState, action) {
  switch (action.type) {
    case GET_LAWSUITS_SUCCESS:
      return { ...state, data: action.payload };

    case FIND_LAWSUITS:
      return { ...state, data: action.payload };

    default:
      return state;
  }
}