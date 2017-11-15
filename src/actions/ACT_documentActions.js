import { GET_DOCUMENTS_SUCCESS, EDIT_DOCUMENT, EDIT_DOCUMENT_CANCEL, SAVE_DOCUMENT, ADD_DOCUMENT } from '../constants/CON_documents';
import Backendless from '../backendless';


function getDocumentsFunc(queryBuilder, dispatch, type) {
  let documentsArray = [];

  queryBuilder.setSortBy(['created DESC']);

  Backendless.Data
    .of('Documents')
    .find(queryBuilder)
    .then((receivedData) => {
      documentsArray = receivedData.map(item => item);

      dispatch({
        type: type,
        payload: documentsArray,
      });
    });
}

export function getDocuments(documentId) {
  return (dispatch) => {
    const queryBuilder = Backendless.DataQueryBuilder.create();

    if (documentId) {
      queryBuilder.setWhereClause("objectId =  '" + documentId + "'");
    } else {
      queryBuilder.setWhereClause();
    }

    getDocumentsFunc(queryBuilder, dispatch, GET_DOCUMENTS_SUCCESS);
  };
}

export function editDocument(documentId) {
  return (dispatch) => {
    dispatch({
      type: EDIT_DOCUMENT,
      payload: documentId,
    });
  };
}

export function editDocumentCancel() {
  return (dispatch) => {
    dispatch({
      type: EDIT_DOCUMENT_CANCEL,
    });
  };
}

export function saveDocument(documentId, refs) {
  return (dispatch) => {
    Backendless.Data
      .of('Documents')
      .save({
        name: refs.documentName,
        type: refs.documentType,
        objectId: documentId,
      })
      .then(() => {
        const queryBuilder = Backendless.DataQueryBuilder.create();

        getDocumentsFunc(queryBuilder, dispatch, SAVE_DOCUMENT);
      });
  };
}

export function addDocument(refs) {
  return (dispatch) => {
    Backendless.Data
      .of('Documents')
      .save({
        name: refs.addDocumentName.value,
        type: refs.addDocumentType.value,
      })
      .then(() => {
        const queryBuilder = Backendless.DataQueryBuilder.create();

        getDocumentsFunc(queryBuilder, dispatch, ADD_DOCUMENT);
      });
  };
}

export function deleteDocument(objectId) {
  return (dispatch) => {
    Backendless.Data
      .of('Documents')
      .remove({ objectId: objectId })
      .then(() => {
        const queryBuilder = Backendless.DataQueryBuilder.create();

        getDocumentsFunc(queryBuilder, dispatch, GET_DOCUMENTS_SUCCESS);
      });
  };
}