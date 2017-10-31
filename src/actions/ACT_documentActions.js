import { GET_DOCUMENTS_SUCCESS } from '../constants/CON_documents.js';
import Backendless from '../backendless.js';


export function getDocuments(documentId) {
  return (dispatch) => {

    let documentsArray = [];
    let queryBuilder = Backendless.DataQueryBuilder.create();

    if (documentId) {
      queryBuilder.setWhereClause("id =  '"+ documentId + "'");
    } else {
      queryBuilder.setWhereClause();
    }

    Backendless.Data
      .of('Documents')
      .find(queryBuilder)
      .then((array) => {
        if (!array) return;
        for (let key in array) {
          documentsArray.push(array[key]);
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