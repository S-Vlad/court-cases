import { GET_PARTICIPANTS, DELETE_PARTICIPANT, EDIT_PARTICIPANT, SAVE_PARTICIPANT } from '../constants/CON_participants.js';


const initialState = {
  edit: false
};

export default function participants(state = initialState, action) {
  switch(action.type) {
    case GET_PARTICIPANTS:
      return {...state, data: action.payload, edit: false};

    case DELETE_PARTICIPANT:
      return {...state, data: action.payload};

    case EDIT_PARTICIPANT:
      return {...state, edit: action.payload};

    case SAVE_PARTICIPANT:
      return {...state/*, data: action.payload*/, edit: false};

    default:
      return state;
  }
}