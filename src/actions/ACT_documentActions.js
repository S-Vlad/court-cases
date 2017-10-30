import { GET_DOCUMENTS_SUCCESS } from '../constants/CON_documents.js';
import Backendless from '../backendless.js';


export function getDocuments() {
  return (dispatch) => {

    let documentsArray = [];
    let queryBuilder = Backendless.DataQueryBuilder.create();

    Backendless.Data
      .of('Documents')
      .find(queryBuilder)
      .then((array) => {
        for (let key in array) {
          documentsArray.push(array[key]);
        }

        dispatch({
          type: GET_DOCUMENTS_SUCCESS,
          payload: documentsArray
        });
      });
    }
}