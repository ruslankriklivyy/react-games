import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from './saga/index';
import { userReducer } from '../redux/userReducer';
import { gamesReducer } from '../redux/gamesReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  userReducer,
  gamesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);
