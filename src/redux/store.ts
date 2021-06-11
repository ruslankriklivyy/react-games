import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from './saga/index';
import { gamesReducer } from './reducers/games';
import { listReducer } from './reducers/list';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  gamesReducer,
  listReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);
