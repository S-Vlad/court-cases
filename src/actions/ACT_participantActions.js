import Backendless from '../backendless.js';
import { GET_PARTICIPANTS, DELETE_PARTICIPANT, ADD_PARTICIPANT, EDIT_PARTICIPANT, EDIT_PARTICIPANT_CANCEL , SAVE_PARTICIPANT } from '../constants/CON_participants.js';


function getParticipantsFunc(queryBuilder, dispatch, type) {

  let participantsArray = [];

  Backendless.Data
    .of('Participants')
    .find(queryBuilder)
    .then((receivedData) => {
      for (let key in receivedData) {
        participantsArray.push(receivedData[key]);
      }

      dispatch({
        type: type,
        payload: participantsArray
      });
    })
}

export function getParticipants() {
  return (dispatch) => {

    let queryBuilder = Backendless.DataQueryBuilder.create();

    queryBuilder.setSortBy(['created DESC']);

    getParticipantsFunc(queryBuilder, dispatch, GET_PARTICIPANTS);
  }
}

export function deleteParticipant(participantId) {
  return (dispatch) => {
    Backendless.Data
      .of('Participants')
      .remove({objectId: participantId})
      .then(() => {
        let queryBuilder = Backendless.DataQueryBuilder.create();

        queryBuilder.setSortBy(['created DESC']);

        getParticipantsFunc(queryBuilder, dispatch, DELETE_PARTICIPANT);
      });
  }
}

export function addParticipant(participantId, refParticipantInput) {
  return (dispatch) => {
    Backendless.Data
      .of('Participants')
      .save({
        name: refParticipantInput.addParticipantName.value,
        address: refParticipantInput.addParticipantAddress.value,
        phone: refParticipantInput.addParticipantPhone.value,
        type: refParticipantInput.addParticipantType.value,
        objectId: participantId
      })
      .then(() => {
        let queryBuilder = Backendless.DataQueryBuilder.create();

        queryBuilder.setSortBy(['created DESC']);

        getParticipantsFunc(queryBuilder, dispatch, ADD_PARTICIPANT);

      });
  }
}

export function editParticipant(participantId) {
  return (dispatch) => {
    dispatch({
      type: EDIT_PARTICIPANT,
      payload: participantId
    });
  }
}

export function editParticipantCancel() {
  return (dispatch) => {
    dispatch({
      type: EDIT_PARTICIPANT_CANCEL,
    });
  }
}

export function saveParticipant(participantId, refParticipantInput) {
  return (dispatch) => {

    Backendless.Data
      .of('Participants')
      .save({
        name: refParticipantInput.participantName.value,
        address: refParticipantInput.participantAddress.value,
        phone: refParticipantInput.participantPhone.value,
        type: refParticipantInput.participantType.value,
        objectId: participantId
      })
      .then(() => {
        let queryBuilder = Backendless.DataQueryBuilder.create();

        queryBuilder.setSortBy(['created DESC']);

        getParticipantsFunc(queryBuilder, dispatch, SAVE_PARTICIPANT);
      })
  }
}