import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { REGISTER_START_ACTION, Creators, Action } from '..';
import auth from '../../../../services/auth';
import ROUTES from '../../../../navigation/routes';

export function* registerStartAsync(action: Action): any {
  try {
    yield call(auth.createUser, action.payload);
    yield put(Creators.registerSuccess());
    yield put(Creators.loginStart({ username: action.payload.username, password: action.payload.password }));
    yield put(push(ROUTES.INDEX));
  } catch (e) {
    yield put(Creators.registerError(e));
  }
}

export default function* watchRegisterStart(): any {
  yield takeLatest(REGISTER_START_ACTION, registerStartAsync);
}
