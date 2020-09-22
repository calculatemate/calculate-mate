import { put, takeLatest, call, delay, select } from 'redux-saga/effects';
import { SAVE_MARKSHEET_START_ACTION, Creators, Action } from '..';
import marksheet from '../../../../services/marksheet';
import { push } from 'connected-react-router';
import ROUTES from '../../../../navigation/routes';
import { Selectors } from '../../auth';

export function* saveMarksheetStartAsync(action: Action): any {
  try {
    if (action.payload.id) {
      const mark = {
        rows: action.payload.rows,
        id: action.payload.id,
        name: action.payload.name,
      };
      yield call(marksheet.editMarksheet, mark);
      // @ts-ignore
      yield put(Creators.selectMarksheet({ marksheet: mark }));
    } else {
      yield call(marksheet.newMarksheet, {
        rows: action.payload.rows,
        userId: action.payload.userId,
        name: action.payload.name,
      });
    }
    const info = yield select(Selectors.info);
    yield put(Creators.saveMarksheetSuccess());
    yield put(Creators.getMarksheetStart({ userId: info.id }));
    yield delay(1000);
    yield put(push(ROUTES.SAVED_WORK));
  } catch (e) {
    yield put(Creators.saveMarksheetError(e));
  }
}

export default function* watchSaveMarksheetStart(): any {
  yield takeLatest(SAVE_MARKSHEET_START_ACTION, saveMarksheetStartAsync);
}
