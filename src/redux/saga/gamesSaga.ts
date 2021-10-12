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
import {
  IGamesResponse,
  IGenresPresponse,
  IOneGameItemResponse,
  IScreenshotsResponse,
} from '../../interfaces/interfaces';
import {
  fetchGamesFromApi,
  fetchGenresFromApi,
  fetchOneGameFromApi,
  fetchScreenshotsFromApi,
} from '../../api/api';

function* fetchScreenshotsWorker({ payload }: FetchScreenshots) {
  try {
    const { data }: IScreenshotsResponse = yield call(fetchScreenshotsFromApi, payload);
    yield put(setScreenshots(data));
  } catch (err) {
    console.log(err);
  }
}

function* fetchGamesWorker({ genreName, quearySearch, pageNumber, orderBy }: FetchGames) {
  try {
    const { data }: IGamesResponse = yield call(
      fetchGamesFromApi,
      genreName,
      quearySearch,
      pageNumber,
      orderBy,
    );
    yield put(setGames(data));
  } catch (err) {
    console.log(err);
  }
}

function* fetchOneGameWorker(action: FetchOneGame) {
  try {
    const { data }: IOneGameItemResponse = yield call(fetchOneGameFromApi, action.payload);
    yield put(setChosenGame(data));
  } catch (err) {
    console.log(err);
  }
}

function* fetchGenresWorker() {
  try {
    const { data }: IGenresPresponse = yield call(fetchGenresFromApi);
    yield put(setGenres(data));
  } catch (err) {
    console.log(err);
  }
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
