import { /*GET_LAWSUITS_REQUEST,*/ GET_LAWSUITS_SUCCESS } from '../constants/CON_lawsuits.js';
import Backendless from '../backendless.js';


export function getLawsuits(showAllLawsuits) {
  return (dispatch) => {
    // dispatch({
    //   type: GET_LAWSUITS_REQUEST
    // });

    let lawsuitsArray = [];
    let queryBuilder = Backendless.DataQueryBuilder.create();

    queryBuilder.setRelated(['documents_id', 'participants_id', 'schedule_id']);

    if (!showAllLawsuits) {
      queryBuilder.setWhereClause("state != 'Завершено'");
    } else {
      queryBuilder.setWhereClause();
    }

    Backendless.Data
      .of('Lawsuit')
      .find(queryBuilder)
      .then((receivedData) => {
        for (let key in receivedData) {
          lawsuitsArray.push(receivedData[key]);
        }

        dispatch({
          type: GET_LAWSUITS_SUCCESS,
          payload: lawsuitsArray
        });
      });
  }
}


