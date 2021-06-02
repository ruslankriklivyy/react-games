import { put, takeEvery, call } from 'redux-saga/effects';
import {
  FETCH_ITEMS,
  FETCH_GENRES,
  FETCH_ONE_GAME,
  FETCH_SCREENSHOTS,
} from '../../types/gamesTypes';

import {
  FetchScreenshots,
  FetchGames,
  FetchOneGame,
  setChosenGame,
  setGames,
  setGenres,
  setScreenshots,
} from '../actions/games';
import { IGameItem, IGames, IGenres, IScreenshots } from '../../interfaces/interfaces';
import {
  fetchGamesFromApi,
  fetchGenresFromApi,
  fetchOneGameFromApi,
  fetchScreenshotsFromApi,
} from '../../api/api';

function* fetchScreenshotsWorker(action: FetchScreenshots) {
  const data: IScreenshots = yield fetchScreenshotsFromApi(action);
  yield put(setScreenshots(data));
}

function* fetchGamesWorker(action: FetchGames) {
  const { genreName, quearySearch, pageNumber, orderBy } = action;

  const data: IGames = yield fetchGamesFromApi(genreName, quearySearch, pageNumber, orderBy);
  yield put(setGames(data));
}

function* fetchOneGameWorker(action: FetchOneGame) {
  const data: IGameItem = yield fetchOneGameFromApi(action.payload);
  yield put(setChosenGame(data));
}

function* fetchGenresWorker() {
  const data: IGenres = yield call(fetchGenresFromApi);
  yield put(setGenres(data));
}

export function* screenshotsWatcher() {
  yield takeEvery(FETCH_SCREENSHOTS, fetchScreenshotsWorker);
}

export function* gamesWatcher() {
  yield takeEvery(FETCH_ITEMS, fetchGamesWorker);
}

export function* oneGameWatcher() {
  yield takeEvery(FETCH_ONE_GAME, fetchOneGameWorker);
}

export function* genresWatcher() {
  yield takeEvery(FETCH_GENRES, fetchGenresWorker);
}
