import { all } from 'redux-saga/effects';
import { tokenWatcher } from './userSaga';
import { gamesWatcher, genresWatcher, oneGameWatcher, screenshotsWatcher } from './gamesSaga';

export function* rootWatcher() {
  yield all([
    tokenWatcher(),
    gamesWatcher(),
    genresWatcher(),
    oneGameWatcher(),
    screenshotsWatcher(),
  ]);
}
