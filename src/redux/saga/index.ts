import { all } from 'redux-saga/effects';
import { gamesWatcher, genresWatcher, oneGameWatcher, screenshotsWatcher } from './gamesSaga';

export function* rootWatcher() {
  yield all([gamesWatcher(), genresWatcher(), oneGameWatcher(), screenshotsWatcher()]);
}
