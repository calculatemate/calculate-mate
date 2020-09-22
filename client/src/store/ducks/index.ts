import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import appIntegrationReducer, { NAMESPACE as APP_INTEGRATION_NAMESPACE } from './app-integration';
import authReducer, { NAMESPACE as AUTH_NAMESPACE } from './auth';
import marksheetReducer, { NAMESPACE as MARKSHEET_NAMESPACE } from './marksheet';
import { history } from '../../navigation/routes';

export default combineReducers({
  [APP_INTEGRATION_NAMESPACE]: appIntegrationReducer,
  [AUTH_NAMESPACE]: authReducer,
  [MARKSHEET_NAMESPACE]: marksheetReducer,
  router: connectRouter(history),
});
