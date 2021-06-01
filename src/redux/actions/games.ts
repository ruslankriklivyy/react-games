import { IGameItem, IGames, IGenres, IScreenshots } from '../../interfaces/interfaces';
import {
  FETCH_GENRES,
  FETCH_ITEMS,
  FETCH_ONE_GAME,
  FETCH_SCREENSHOTS,
} from '../../types/gamesTypes';

const SET_IS_LOADING_GAMES = 'SET_IS_LOADING_GAMES';
const SET_ITEMS = 'SET_ITEMS';
const SET_GENRES = 'SET_GENRES';
const SET_GENRE_NAME = 'SET_GENRE_NAME';
const SET_QUERY_SEARCH = 'SET_QUERY_SEARCH';
const SET_GAME_ID = 'SET_GAME_ID';
const SET_CHOSEN_GAME = 'SET_CHOSEN_GAME';
const SET_SCREENSHOTS = 'SET_SCREENSHOTS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_ORDER_TYPE = 'SET_ORDER_TYPE';

interface SetCurrentPage {
  type: typeof SET_CURRENT_PAGE;
  payload: number;
}
export const setCurrentPage = (pageNumber: number): SetCurrentPage => ({
  type: SET_CURRENT_PAGE,
  payload: pageNumber,
});

interface SetIsLoadingGames {
  type: typeof SET_IS_LOADING_GAMES;
  payload: boolean;
}
export const setIsLoadingGames = (isLoading: boolean): SetIsLoadingGames => ({
  type: SET_IS_LOADING_GAMES,
  payload: isLoading,
});

interface SetOrderBy {
  type: typeof SET_ORDER_TYPE;
  payload: string;
}
export const setOrderBy = (orderBy: string): SetOrderBy => ({
  type: SET_ORDER_TYPE,
  payload: orderBy,
});

interface SetScreenshots {
  type: typeof SET_SCREENSHOTS;
  payload: IScreenshots;
}
export const setScreenshots = (obj: IScreenshots): SetScreenshots => ({
  type: SET_SCREENSHOTS,
  payload: obj,
});

interface SetGames {
  type: typeof SET_ITEMS;
  payload: IGames;
}
export const setGames = (items: IGames): SetGames => ({ type: SET_ITEMS, payload: items });

interface SetGenres {
  type: typeof SET_GENRES;
  payload: IGenres;
}
export const setGenres = (genres: IGenres): SetGenres => ({ type: SET_GENRES, payload: genres });

interface SetGenreName {
  type: typeof SET_GENRE_NAME;
  payload: string;
}
export const setGenreName = (genreName: string): SetGenreName => ({
  type: SET_GENRE_NAME,
  payload: genreName,
});

interface SetChosenGame {
  type: typeof SET_CHOSEN_GAME;
  payload: IGameItem;
}
export const setChosenGame = (item: IGameItem): SetChosenGame => ({
  type: SET_CHOSEN_GAME,
  payload: item,
});

interface SetGameId {
  type: typeof SET_GAME_ID;
  payload: number;
}
export const setGameId = (gameId: number): SetGameId => ({ type: SET_GAME_ID, payload: gameId });

interface SetQuearySearch {
  type: typeof SET_QUERY_SEARCH;
  payload: string;
}
export const setQuearySearch = (quearySearch: string): SetQuearySearch => ({
  type: SET_QUERY_SEARCH,
  payload: quearySearch,
});

export interface FetchGames {
  type: typeof FETCH_ITEMS;
  genreName: string;
  quearySearch: string;
  pageNumber: number;
  orderBy: string;
}
export const fetchGames = (
  genreName: string,
  quearySearch: string,
  pageNumber: number,
  orderBy: string,
): FetchGames => ({
  type: FETCH_ITEMS,
  genreName: genreName,
  quearySearch: quearySearch,
  pageNumber: pageNumber,
  orderBy: orderBy,
});

interface FetchGenres {
  type: typeof FETCH_GENRES;
}
export const fetchGenres = (): FetchGenres => ({ type: FETCH_GENRES });

export interface FetchOneGame {
  type: typeof FETCH_ONE_GAME;
  payload: number | null;
}
export const fetchOneGame = (gameId: number | null): FetchOneGame => ({
  type: FETCH_ONE_GAME,
  payload: gameId,
});

export interface FecthScreenshots {
  type: typeof FETCH_SCREENSHOTS;
  payload: string | null;
}
export const fecthScreenshots = (name: string | null): FecthScreenshots => ({
  type: FETCH_SCREENSHOTS,
  payload: name,
});

export type Actions =
  | FecthScreenshots
  | FetchOneGame
  | FetchGenres
  | FetchGames
  | SetQuearySearch
  | SetGameId
  | SetChosenGame
  | SetGenreName
  | SetGenres
  | SetGames
  | SetScreenshots
  | SetOrderBy
  | SetIsLoadingGames
  | SetCurrentPage;
