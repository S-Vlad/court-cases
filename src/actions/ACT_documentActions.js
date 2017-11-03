import { GET_DOCUMENTS_SUCCESS, EDIT_DOCUMENT, EDIT_DOCUMENT_CANCEL, SAVE_DOCUMENT, ADD_DOCUMENT } from '../constants/CON_documents.js';
import Backendless from '../backendless.js';


export function getDocuments(documentId) {
  return (dispatch) => {

    let documentsArray = [],
        queryBuilder = Backendless.DataQueryBuilder.create();

    if (documentId) {
      queryBuilder.setWhereClause("objectId =  '"+ documentId + "'");
    } else {
      queryBuilder.setWhereClause();
    }

    Backendless.Data
      .of('Documents')
      .find(queryBuilder)
      .then((receivedData) => {
        for (let key in receivedData) {
          documentsArray.push(receivedData[key]);
        }

        dispatch({
          type: GET_DOCUMENTS_SUCCESS,
          payload: documentsArray
        });
      }
      )
      .catch((error) => {
        return (
          dispatch({
            type: GET_DOCUMENTS_SUCCESS,
            payload: false
          })
        )
      });
    }
}

export function editDocument() {
  return(dispatch) => {
    dispatch({
      type: EDIT_DOCUMENT
    });
  }
}

export function editDocumentCancel() {
  return(dispatch) => {
    dispatch({
      type: EDIT_DOCUMENT_CANCEL
    });
  }
}

export function saveDocument(documentId, refDocumentInput) {
  return(dispatch) => {
    Backendless.Data
      .of('Documents')
      .save({
        name: refDocumentInput.saveDocumentInput.value,
        objectId: documentId,
        type: refDocumentInput.saveDocumentSelect.value
      })
      .then(function(data) {
        dispatch({
          type: SAVE_DOCUMENT,
          payload: [data]
        })
      })
  }
}

export function addDocument(refDocumentInput) {
  return (dispatch) => {

    Backendless.Data
      .of('Documents')
      .save({
        name: refDocumentInput.addDocumentInput.value,
        type: refDocumentInput.addDocumentSelect.value
      })
      .then(() => {
        let documentsArray = [],
            queryBuilder = Backendless.DataQueryBuilder.create();

        queryBuilder.setSortBy(['created DESC']);

        Backendless.Data
          .of('Documents')
          .find(queryBuilder)
          .then((receivedData) => {
            for (let key in receivedData) {
              documentsArray.push(receivedData[key]);
            }

            dispatch({
              type: ADD_DOCUMENT,
              payload: documentsArray
            });
          });
      });
  }
}