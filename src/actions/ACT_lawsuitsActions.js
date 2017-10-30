import { /*GET_LAWSUITS_REQUEST,*/ GET_LAWSUITS_SUCCESS } from '../constants/CON_lawsuits.js';
import Backendless from 'backendless';


export function getLawsuits(showAllLawsuits) {
  let APP_ID = 'C628BF52-59E9-ECE7-FFE9-008134821D00',
      API_KEY = '96C6A98F-74C6-A5E4-FF35-7FFB0A7E7E00';

  Backendless.initApp(APP_ID, API_KEY);

  return (dispatch) => {
    // dispatch({
    //   type: GET_LAWSUITS_REQUEST
    // });

    let data = [];
    let queryBuilder = Backendless.DataQueryBuilder.create();

    if (!showAllLawsuits) {
      queryBuilder.setWhereClause("state != 'Завершено'");
    } else {
      queryBuilder.setWhereClause();
    }

    Backendless.Data.of('Lawsuit')
      .find(queryBuilder)
      .then((array) => {
        for (let key in array) {
          data.push(array[key]);
        }

        dispatch({
          type: GET_LAWSUITS_SUCCESS,
          payload: data
        });
      });
  }
}