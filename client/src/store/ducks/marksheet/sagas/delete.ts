import { put, takeLatest, call, select } from 'redux-saga/effects';
import { DELETE_MARKSHEET_START_ACTION, Creators, Action } from '..';
import marksheet from '../../../../services/marksheet';
import { Selectors } from '../../auth';

export function* deleteMarksheetStartAsync(action: Action): any {
  try {
    const info = yield select(Selectors.info);
    yield call(marksheet.deleteMarksheet, { id: action.payload.id });
    yield put(Creators.getMarksheetStart({ userId: info.id }));
    yield put(Creators.deleteMarksheetSuccess());
  } catch (e) {
    yield put(Creators.deleteMarksheetError(e));
  }
}

export default function* watchDeleteMarksheetStart(): any {
  yield takeLatest(DELETE_MARKSHEET_START_ACTION, deleteMarksheetStartAsync);
}
