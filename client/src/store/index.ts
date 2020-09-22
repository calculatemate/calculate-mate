import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { routerMiddleware } from 'connected-react-router';
import reducers from './ducks';
import rootSaga from './rootSagas';
import { history } from '../navigation/routes';
import { appStart } from './ducks/app-integration';
import { NAMESPACE } from './ducks/marksheet';

const BLACKLIST = [NAMESPACE];
const persistConfig = {
  key: 'root',
  storage,
  blacklist: BLACKLIST,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware), applyMiddleware(routerMiddleware(history))),
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

store.dispatch(appStart());

export default store;
