import { GET_DOCUMENTS_SUCCESS } from '../constants/CON_documents.js';
import Backendless from '../backendless.js';


export function getDocuments(documentId) {
  return (dispatch) => {

    let documentsArray = [],
        queryBuilder = Backendless.DataQueryBuilder.create();

    queryBuilder.setRelated(['documents_id'/*, 'participants_id', 'schedule_id'*/]);

    if (documentId) {
      queryBuilder.setWhereClause("id =  '"+ documentId + "'");
    } else {
      queryBuilder.setWhereClause();
    }

    Backendless.Data
      .of('Lawsuit')
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