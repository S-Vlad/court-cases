import { /*GET_LAWSUITS_REQUEST,*/ GET_LAWSUITS_SUCCESS } from '../constants/CON_lawsuits.js';
import Backendless from '../backendless.js';


export function getLawsuits(showAllLawsuits) {
  return (dispatch) => {
    // dispatch({
    //   type: GET_LAWSUITS_REQUEST
    // });

    let lawsuitsArray = [];
    let queryBuilder = Backendless.DataQueryBuilder.create();

    if (!showAllLawsuits) {
      queryBuilder.setWhereClause("state != 'Завершено'");
    } else {
      queryBuilder.setWhereClause();
    }

    Backendless.Data
      .of('Lawsuit')
      .find(queryBuilder)
      .then((array) => {
        for (let key in array) {
          lawsuitsArray.push(array[key]);
        }

        dispatch({
          type: GET_LAWSUITS_SUCCESS,
          payload: lawsuitsArray
        });
      });
  }
}