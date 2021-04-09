import { all } from 'redux-saga/effects';
import { tokenWatcher } from './userSaga';
import { gamesWatcher, genresWatcher, oneGameWatcher } from './gamesSaga';

export function* rootWatcher() {
  yield all([tokenWatcher(), gamesWatcher(), genresWatcher(), oneGameWatcher()]);
}
