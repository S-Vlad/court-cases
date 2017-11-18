import Backendless from '../backendless';
import {
  GET_PARTICIPANTS,
  DELETE_PARTICIPANT,
  ADD_PARTICIPANT,
  EDIT_PARTICIPANT,
  EDIT_PARTICIPANT_CANCEL,
  SAVE_PARTICIPANT,
} from '../constants/CON_participants';


function getParticipantsFunc(queryBuilder, dispatch, type) {
  queryBuilder.setSortBy(['created DESC']);
  queryBuilder.setPageSize(12);

  Backendless.Data
    .of('Participants')
    .find(queryBuilder)
    .then((receivedParticipants) => {
      dispatch({
        type,
        payload: receivedParticipants,
      });
    });
}

export function getParticipants() {
  return (dispatch) => {
    const queryBuilder = Backendless.DataQueryBuilder.create();

    getParticipantsFunc(queryBuilder, dispatch, GET_PARTICIPANTS);
  };
}

export function deleteParticipant(participantId) {
  return (dispatch) => {
    Backendless.Data
      .of('Participants')
      .remove({ objectId: participantId })
      .then(() => {
        const queryBuilder = Backendless.DataQueryBuilder.create();

        getParticipantsFunc(queryBuilder, dispatch, DELETE_PARTICIPANT);
      });
  };
}

export function addParticipant(refs) {
  return (dispatch) => {
    Backendless.Data
      .of('Participants')
      .save({
        name: refs.addParticipantName.value,
        address: refs.addParticipantAddress.value,
        phone: refs.addParticipantPhone.value,
        type: refs.addParticipantType.value,
      })
      .then(() => {
        const queryBuilder = Backendless.DataQueryBuilder.create();

        getParticipantsFunc(queryBuilder, dispatch, ADD_PARTICIPANT);
      });
  };
}

export function editParticipant(participantId) {
  return (dispatch) => {
    dispatch({
      type: EDIT_PARTICIPANT,
      payload: participantId,
    });
  };
}

export function editParticipantCancel() {
  return (dispatch) => {
    dispatch({
      type: EDIT_PARTICIPANT_CANCEL,
    });
  };
}

export function saveParticipant(participantId, refs) {
  return (dispatch) => {
    Backendless.Data
      .of('Participants')
      .save({
        name: refs.participantName,
        address: refs.participantAddress,
        phone: refs.participantPhone,
        type: refs.participantType,
        objectId: participantId,
      })
      .then(() => {
        const queryBuilder = Backendless.DataQueryBuilder.create();

        getParticipantsFunc(queryBuilder, dispatch, SAVE_PARTICIPANT);
      });
  };
}