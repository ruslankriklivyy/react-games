import { put, takeEvery, call } from 'redux-saga/effects';
import {
  FETCH_ITEMS,
  FETCH_GENRES,
  setGenres,
  setGames,
  setChosenGame,
  FETCH_ONE_GAME,
} from '../gamesReducer';

import axios from 'axios';

// @ts-ignore
const games = axios.create({
  baseURL: 'https://api.rawg.io/api/',
});

const fetchOneGameFromApi = (id: number) =>
  games.get(`games/${id}?key=722c9d0913da4424a89ab6e326074614`).then(({ data }) => {
    console.log(data);
    return data;
  });

const fetchGenresFromApi = () =>
  games.get('genres?key=722c9d0913da4424a89ab6e326074614').then(({ data }) => {
    return data;
  });

const fetchGamesFromApi = (genreName: string, quearySearch: string) =>
  games
    .get(
      `games?key=722c9d0913da4424a89ab6e326074614${
        quearySearch !== '' ? `&search=${quearySearch}` : ''
      }${genreName !== null ? `&genres=${genreName}` : ''}`,
    )
    .then(({ data }) => {
      return data;
    });

function* fetchGamesWorker(genreName: any, quearySearch: any) {
  // @ts-ignore
  const data = yield fetchGamesFromApi(genreName.genreName, genreName.quearySearch);
  yield put(setGames(data));
}

function* fetchOneGameWorker(id: any) {
  // @ts-ignore
  const data = yield fetchOneGameFromApi(id.payload);
  yield put(setChosenGame(data));
}

function* fetchGenresWorker() {
  // @ts-ignore
  const data = yield call(fetchGenresFromApi);
  yield put(setGenres(data));
}

export function* gamesWatcher() {
  // @ts-ignore
  yield takeEvery(FETCH_ITEMS, fetchGamesWorker);
}

export function* oneGameWatcher() {
  // @ts-ignore
  yield takeEvery(FETCH_ONE_GAME, fetchOneGameWorker);
}

export function* genresWatcher() {
  yield takeEvery(FETCH_GENRES, fetchGenresWorker);
}
