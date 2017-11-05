import Backendless from '../backendless.js';
import { GET_PARTICIPANTS, DELETE_PARTICIPANT, EDIT_PARTICIPANT, SAVE_PARTICIPANT } from '../constants/CON_participants.js';


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

export function editParticipant(objectId) {
  return (dispatch) => {
    dispatch({
      type: EDIT_PARTICIPANT,
      payload: objectId
    });
  }
}

export function saveParticipants(documentId, refParticipantInput) {
  return (dispatch) => {

    // Backendless.Data
    //   .of('Participants')
    //   .save({
    //     name: refParticipantInput,
    //     telephone: refParticipantInput,
    //     address: refParticipantInput,
    //     type: refParticipantInput,
    //     objectId: documentId
    //   })
    //   .then(() => {
        dispatch({
          type: SAVE_PARTICIPANT
        })
      // })
  }
}

export function deleteParticipant(objectId) {
  return (dispatch) => {
    Backendless.Data
      .of('Participants')
      .remove({objectId: objectId})
      .then(() => {
        let queryBuilder = Backendless.DataQueryBuilder.create();

        queryBuilder.setSortBy(['created DESC']);

        getParticipantsFunc(queryBuilder, dispatch, DELETE_PARTICIPANT);
      });
  }
}