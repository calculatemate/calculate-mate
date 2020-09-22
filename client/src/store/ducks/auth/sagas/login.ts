import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { LOGIN_START_ACTION, Creators, Action } from '..';
import auth from '../../../../services/auth';
import ROUTES from '../../../../navigation/routes';

export function* loginStartAsync(action: Action): any {
  try {
    const token = yield call(auth.login, action.payload);
    yield localStorage.setItem('jwt_access_token', token);
    const info = yield call(auth.userInfo, { username: action.payload.username });
    yield put(Creators.loginSuccess(token, info));
    yield put(push(ROUTES.INDEX));
  } catch (e) {
    yield put(Creators.loginError(e));
  }
}

export default function* watchLoginStart(): any {
  yield takeLatest(LOGIN_START_ACTION, loginStartAsync);
}
