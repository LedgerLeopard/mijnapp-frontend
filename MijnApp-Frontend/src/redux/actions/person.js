export const REQUEST_PERSON_DATA = 'REQUEST_PERSON_DATA';
export const requestPersonData = (id) => ({ type: REQUEST_PERSON_DATA, id });
export const REQUEST_PERSON_DATA_SUCCESS = 'REQUEST_PERSON_DATA_SUCCESS';
export const requestPersonSuccess = (data) => ({
  type: REQUEST_PERSON_DATA_SUCCESS,
  data,
});
export const REQUEST_PERSON_DATA_FAILURE = 'REQUEST_PERSON_DATA_FAILURE';
export const requestPersonDataFailure = (error) => ({
  type: REQUEST_PERSON_DATA_FAILURE,
  error,
});
export const CLEAR_PERSON_DATA = 'CLEAR_PERSON_DATA';
export const clearPersonData = () => ({ type: CLEAR_PERSON_DATA });

//BRP moving people
export const REQUEST_PERSONS_MOVING = 'REQUEST_PERSONS_MOVING';
export const requestPersonsMoving = (id) => ({ type: REQUEST_PERSONS_MOVING, id });
export const REQUEST_PERSONS_MOVING_SUCCESS = 'REQUEST_PERSONS_MOVING_SUCCESS';
export const requestPersonsMovingSuccess = (data) => ({
  type: REQUEST_PERSONS_MOVING_SUCCESS,
  data,
});
export const REQUEST_PERSONS_MOVING_FAILURE = 'REQUEST_PERSONS_MOVING_FAILURE';
export const requestPersonsMovingFailure = (error) => ({
  type: REQUEST_PERSONS_MOVING_FAILURE,
  error,
});
