import { put, takeLatest, call } from 'redux-saga/effects';
import { GET_MARKSHEET_START_ACTION, Creators, Action } from '..';
import marksheet from '../../../../services/marksheet';

export function* getMarksheetStartAsync(action: Action): any {
  try {
    const list = yield call(marksheet.listAll, { userId: action.payload.userId });
    yield put(Creators.getMarksheetSuccess(list));
  } catch (e) {
    yield put(Creators.getMarksheetError(e));
  }
}

export default function* watchGetMarksheetStart(): any {
  yield takeLatest(GET_MARKSHEET_START_ACTION, getMarksheetStartAsync);
}
