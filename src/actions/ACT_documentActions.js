import { GET_DOCUMENTS_SUCCESS, EDIT_DOCUMENT, EDIT_DOCUMENT_CANCEL, SAVE_DOCUMENT, ADD_DOCUMENT} from '../constants/CON_documents.js';
import Backendless from '../backendless.js';


function getDocumentsFunc(queryBuilder, dispatch, type) {
  let documentsArray = [];

  Backendless.Data
  .of('Documents')
  .find(queryBuilder)
  .then((receivedData) => {
    for (let key in receivedData) {
      documentsArray.push(receivedData[key]);
    }

    dispatch({
      type: type,
      payload: documentsArray
    })
  });
}

export function getDocuments(documentId) {
  return (dispatch) => {

    let queryBuilder = Backendless.DataQueryBuilder.create();

    queryBuilder.setSortBy(['created DESC']);

    if (documentId) {
      queryBuilder.setWhereClause("objectId =  '"+ documentId + "'");
    } else {
      queryBuilder.setWhereClause();
    }

    getDocumentsFunc(queryBuilder, dispatch, GET_DOCUMENTS_SUCCESS);
  }
}

export function editDocument(documentId) {
  return (dispatch) => {
    dispatch({
      type: EDIT_DOCUMENT,
      payload: documentId
    });
  }
}

export function editDocumentCancel() {
  return (dispatch) => {
    dispatch({
      type: EDIT_DOCUMENT_CANCEL
    });
  }
}

export function saveDocument(documentId, refDocumentInput) {
  return (dispatch) => {
    Backendless.Data
      .of('Documents')
      .save({
        name: refDocumentInput.documentName.value,
        type: refDocumentInput.documentType.value,
        objectId: documentId
      })
      .then(() => {

        let queryBuilder = Backendless.DataQueryBuilder.create();

        queryBuilder.setSortBy(['created DESC']);

        getDocumentsFunc(queryBuilder, dispatch, SAVE_DOCUMENT)
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
        let queryBuilder = Backendless.DataQueryBuilder.create();

        queryBuilder.setSortBy(['created DESC']);

        getDocumentsFunc(queryBuilder, dispatch, ADD_DOCUMENT);
      });
  }
}

export function deleteDocument(objectId) {
  return (dispatch) => {

    Backendless.Data
      .of('Documents')
      .remove({objectId: objectId})
      .then(() => {
        let queryBuilder = Backendless.DataQueryBuilder.create();

        queryBuilder.setSortBy(['created DESC']);

        getDocumentsFunc(queryBuilder, dispatch, GET_DOCUMENTS_SUCCESS);
      })
  }
}