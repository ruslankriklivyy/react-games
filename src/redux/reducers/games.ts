import { IGameItem, IGames, IGenres, IScreenshots } from '../../interfaces/interfaces';
import { Actions } from '../actions/games';

const initialState = {
  items: {} as IGames,
  gameId: null as number | null,
  genres: {} as IGenres,
  chosenGame: {} as IGameItem,
  genreName: '' as string,
  querySearch: '' as string,
  screenshots: {} as IScreenshots,
  currentPage: 1 as number,
  orderBy: 'Metacritic' as string,
  isLoadingGames: false as boolean,
};

export type InitialState = typeof initialState;

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
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_GENRES = 'FETCH_GENRES';
export const FETCH_ONE_GAME = 'FETCH_ONE_GAME';
export const FETCH_SCREENSHOTS = 'FETCH_SCREENSHOTS';

export const gamesReducer = (state = initialState, action: Actions): InitialState => {
  switch (action.type) {
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

    case SET_IS_LOADING_GAMES:
      return {
        ...state,
        isLoadingGames: action.payload,
      };

    case SET_ORDER_TYPE:
      return {
        ...state,
        orderBy: action.payload,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case SET_SCREENSHOTS:
      return {
        ...state,
        screenshots: action.payload,
      };

    case SET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case SET_GENRE_NAME:
      return {
        ...state,
        genreName: action.payload,
      };

    case SET_QUERY_SEARCH:
      return {
        ...state,
        querySearch: action.payload,
      };

    case SET_GAME_ID:
      if (action.payload) {
        localStorage.setItem('gameId', JSON.stringify(action.payload));
      }

      return {
        ...state,
        gameId: action.payload,
      };

    case SET_CHOSEN_GAME:
      return {
        ...state,
        chosenGame: action.payload,
      };

    default:
      return state;
  }
};
