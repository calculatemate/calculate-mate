import { put, takeLatest, delay } from 'redux-saga/effects';
import { APP_START, appSuccess } from '../index';

export function* appStartAsync(): any {
  yield delay(1000);
  yield put(appSuccess());
}

export default function* watchAppStart(): any {
  yield takeLatest(APP_START, appStartAsync);
}
