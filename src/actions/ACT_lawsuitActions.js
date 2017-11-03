import { GET_LAWSUITS_SUCCESS, FIND_LAWSUITS } from '../constants/CON_lawsuits.js';
import Backendless from '../backendless.js';


export function getLawsuits(showAllLawsuits, lawsuitId) {
  return (dispatch) => {

    let lawsuitsArray = [],
        queryBuilder = Backendless.DataQueryBuilder.create();

    queryBuilder.setRelated(['documents_id', 'participants_id', 'schedule_id']);

    if (!lawsuitId) {
      if (!showAllLawsuits) {
        queryBuilder.setWhereClause("state != 'Завершено'");
      } else {
        queryBuilder.setWhereClause();
      }
    } else {
      queryBuilder.setWhereClause("objectId =  '"+ lawsuitId + "'");
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

export function findLawsuits(searchData) {
  return (dispatch) => {

    let lawsuitsArray = [],
        queryBuilder = Backendless.DataQueryBuilder.create();

    queryBuilder.setRelated(['documents_id', 'participants_id', 'schedule_id']);
    queryBuilder.setWhereClause(
      "objectId IN (Lawsuit[participants_id.name LIKE '%" + searchData + "%'].objectId) " +
      "OR objectId IN (Lawsuit[schedule_id.date_ LIKE '%" + searchData + "%'].objectId) " +
      "OR state LIKE '%" + searchData + "%' " +
      "OR type LIKE '%" + searchData + "%' "
    );

    Backendless.Data
      .of('Lawsuit')
      .find(queryBuilder)
      .then((receivedData) => {
        for (let key in receivedData) {
          lawsuitsArray.push(receivedData[key]);
        }

        dispatch({
          type: FIND_LAWSUITS,
          payload: lawsuitsArray
        });
      });
  }
}


