import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { LOGOUT_START_ACTION, Creators } from '..';
import ROUTES from '../../../../navigation/routes';

export function* logoutStartAsync(): any {
  try {
    yield localStorage.removeItem('jwt_access_token');
    yield put(Creators.logoutSuccess());
    yield put(push(ROUTES.INDEX));
  } catch (e) {
    yield put(Creators.logoutError(e));
  }
}

export default function* watchLogoutStart(): any {
  yield takeLatest(LOGOUT_START_ACTION, logoutStartAsync);
}
