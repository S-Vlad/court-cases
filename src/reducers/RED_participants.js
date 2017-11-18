import {
  GET_PARTICIPANTS,
  DELETE_PARTICIPANT,
  ADD_PARTICIPANT,
  EDIT_PARTICIPANT,
  EDIT_PARTICIPANT_CANCEL,
  SAVE_PARTICIPANT,
} from '../constants/CON_participants';


const initialState = {
  edit: false,
};

export default function participants(state = initialState, action) {
  switch (action.type) {
    case GET_PARTICIPANTS:
      return { ...state, data: action.payload, edit: false };

    case DELETE_PARTICIPANT:
      return { ...state, data: action.payload };

    case ADD_PARTICIPANT:
      return { ...state, data: action.payload };

    case EDIT_PARTICIPANT:
      return { ...state, edit: action.payload };

    case EDIT_PARTICIPANT_CANCEL:
      return { ...state, edit: false };

    case SAVE_PARTICIPANT:
      return { ...state, data: action.payload, edit: false };

    default:
      return state;
  }
}