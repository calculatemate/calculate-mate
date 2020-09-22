import { all } from 'redux-saga/effects';
import appIntegrationSagas from './ducks/app-integration/sagas';
import authSagas from './ducks/auth/sagas';
import marksheetSagas from './ducks/marksheet/sagas';

// !!!!!!!!!! ADD SAGA HERE TO WORK !!!!!!!!!!!!!!!!
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* rootSaga() {
  yield all([...appIntegrationSagas, ...authSagas, ...marksheetSagas]);
}
