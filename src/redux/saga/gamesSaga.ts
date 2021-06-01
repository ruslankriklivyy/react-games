import { put, takeEvery, call } from 'redux-saga/effects';
import {
  FETCH_ITEMS,
  FETCH_GENRES,
  FETCH_ONE_GAME,
  FETCH_SCREENSHOTS,
} from '../../types/gamesTypes';

import axios from 'axios';
import {
  FecthScreenshots,
  FetchGames,
  FetchOneGame,
  setChosenGame,
  setGames,
  setGenres,
  setScreenshots,
} from '../actions/games';
import { IGameItem, IGames, IGenres, IScreenshots } from '../../interfaces/interfaces';

const games = axios.create({
  baseURL: 'https://api.rawg.io/api/',
});

const fetchScreenshotsFromApi = (action: FecthScreenshots) =>
  games
    .get(`games/${action.payload}/screenshots?key=722c9d0913da4424a89ab6e326074614`)
    .then(({ data }) => {
      return data;
    });

const fetchOneGameFromApi = (id: number | null) =>
  games.get(`games/${id}?key=722c9d0913da4424a89ab6e326074614`).then(({ data }) => {
    return data;
  });

const fetchGenresFromApi = () =>
  games.get('genres?key=722c9d0913da4424a89ab6e326074614').then(({ data }) => {
    return data;
  });

const fetchGamesFromApi = (
  genreName: string,
  quearySearch: string,
  pageNumber: number,
  orderBy: string,
) =>
  games
    .get(
      `games?key=722c9d0913da4424a89ab6e326074614${
        quearySearch !== '' ? `&search=${quearySearch}` : ''
      }${
        genreName !== '' ? `&genres=${genreName}` : ''
      }&ordering=-${orderBy.toLowerCase()}&page=${pageNumber}`,
    )
    .then(({ data }) => {
      return data;
    });

function* fetchScreenshotsWorker(action: FecthScreenshots) {
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
