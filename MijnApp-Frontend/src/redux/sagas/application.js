import { call, put, takeLatest } from 'redux-saga/effects';
import { SELECT_PAGE, SELECT_PAGE_NO_HISTORY, NEXT_PAGE_AFTER_LOGIN, selectPage, selectPageNoHistory } from '../actions/application';
import { store } from '../store';
import { clearContract } from '../actions/contract';
import { jwtBearerTokenExists } from '../helpers/headers';

export function* watchSelectPage() {
  yield takeLatest(SELECT_PAGE, pageSelected);
}

function* pageSelected(action) {
  if (action.page !== 'signin' && !jwtBearerTokenExists()) {
    yield put(selectPageNoHistory('signin'));
  }
  yield call(scrollToTop());
  yield call(setHistory(action.page, action.page, action.page));
  let state = store.getState();
  if (
    action.page !== 'contract' &&
    (state && state.contract && state.contract.data && state.contract.data.id)
  ) {
    yield put(clearContract());
  }
}

export function* watchSelectPageNoHistory() {
  yield takeLatest(SELECT_PAGE_NO_HISTORY, pageSelectedNoHistory);
}

function* pageSelectedNoHistory(action) {
  if (action.page !== 'signin' && !jwtBearerTokenExists()) {
    yield put(selectPageNoHistory('signin'));
  }
  yield call(scrollToTop());
}

const scrollToTop = () => async () => {
  window.scrollTo(0, 0);
};

const setHistory = (state, title, url) => async () => {
  history.pushState(state, title, url);
  var lastState = { 'state': state, 'title': title, 'url': url };
  const stringifiedLastState = JSON.stringify(lastState);
  window.sessionStorage.setItem("mijnApp-lastState", stringifiedLastState);
  
}

export function* watchNextPageAfterLogin() {
  yield takeLatest(NEXT_PAGE_AFTER_LOGIN, nextPageAfterLogin);
}

function* nextPageAfterLogin() {
  //Try to move to the last known page. If that is not available, just navigate home
  var stringifiedLastState = sessionStorage.getItem("mijnApp-lastState");
  if (stringifiedLastState) {
    var lastStateFromStorage = JSON.parse(stringifiedLastState);
    if (lastStateFromStorage && lastStateFromStorage.state && lastStateFromStorage.state !== 'signin') {
      yield put(selectPage(lastStateFromStorage.state));
    } else {
      yield put(selectPage('home'));
    }
  }else {
    yield put(selectPage('home'));
  }
  yield call(scrollToTop());
}
