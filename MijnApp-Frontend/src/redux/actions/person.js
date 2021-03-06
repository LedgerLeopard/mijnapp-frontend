export const REQUEST_PERSON_DATA = 'REQUEST_PERSON_DATA';
export const requestPersonData = () => ({
  type: REQUEST_PERSON_DATA,
});
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
export const clearPersonData = () => ({
  type: CLEAR_PERSON_DATA,
});

// BRP moving people
export const REQUEST_PERSONS_MOVING = 'REQUEST_PERSONS_MOVING';
export const requestPersonsMoving = () => ({ type: REQUEST_PERSONS_MOVING });
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
export const CLEAR_PERSONS_MOVING = 'CLEAR_PERSONS_MOVING';
export const clearPersonsMoving = () => ({ type: CLEAR_PERSONS_MOVING });

export const REQUEST_PERSONS_MOVING_SKIPQUESTION = 'REQUEST_PERSONS_MOVING_SKIPQUESTION';
export const requestPersonsMovingSkipQuestion = () => ({ type: REQUEST_PERSONS_MOVING_SKIPQUESTION });

export const REQUEST_PERSONS_MOVING_SELECT_ALL = 'REQUEST_PERSONS_MOVING_SELECT_ALL';
export const requestPersonsMovingSelectAll = () => ({ type: REQUEST_PERSONS_MOVING_SELECT_ALL });
