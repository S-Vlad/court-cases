import { GET_LAWSUITS_SUCCESS, FIND_LAWSUITS } from '../constants/CON_lawsuits.js';
import Backendless from '../backendless.js';


function getLawsuitsFunc(queryBuilder, dispatch, type) {
  let lawsuitsArray = [];

  Backendless.Data
  .of('Lawsuit')
  .find(queryBuilder)
  .then((receivedData) => {
    for (let key in receivedData) {
      lawsuitsArray.push(receivedData[key]);
    }

    dispatch({
      type: type,
      payload: lawsuitsArray
    });
  });
}

export function getLawsuits(showAllLawsuits, lawsuitId) {
  return (dispatch) => {

    let queryBuilder = Backendless.DataQueryBuilder.create();

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

    getLawsuitsFunc(queryBuilder, dispatch, GET_LAWSUITS_SUCCESS);
  }
}

export function findLawsuits(searchData) {
  return (dispatch) => {


   let queryBuilder = Backendless.DataQueryBuilder.create();

    queryBuilder.setRelated(['documents_id', 'participants_id', 'schedule_id']);
    queryBuilder.setWhereClause(
      "objectId IN (Lawsuit[participants_id.name LIKE '%" + searchData + "%'].objectId) " +
      "OR objectId IN (Lawsuit[schedule_id.date_ LIKE '%" + searchData + "%'].objectId) " +
      "OR objectId IN (Lawsuit[documents_id.name LIKE '%" + searchData + "%'].objectId) " +
      "OR state LIKE '%" + searchData + "%' " +
      "OR type LIKE '%" + searchData + "%' "
    );

    getLawsuitsFunc(queryBuilder, dispatch, FIND_LAWSUITS);
  }
}


