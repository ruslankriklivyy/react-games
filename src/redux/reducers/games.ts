import { IGameItem, IGames, IGenres, IScreenshots } from '../../interfaces/interfaces';
import {
  SET_CHOSEN_GAME,
  SET_CURRENT_PAGE,
  SET_GAME_ID,
  SET_GENRES,
  SET_GENRE_NAME,
  SET_IS_LOADING_GAMES,
  SET_ITEMS,
  SET_ORDER_TYPE,
  SET_QUERY_SEARCH,
  SET_SCREENSHOTS,
} from '../../types/gamesTypes';
import {
  xboxPng,
  epicGamesPng,
  xbox360Png,
  steamPng,
  playstationPng,
  googlePlayPng,
  appStorePng,
  gogPng,
  nintendoPng,
} from '../../utils/storeImages';
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
  storesImages: [
    { name: 'Xbox Store', img: xboxPng, link: 'microsoft.com' },
    { name: 'Epic Games', img: epicGamesPng, link: 'epicgames.com' },
    { name: 'Xbox 360 Store', img: xbox360Png, link: 'marketplace.xbox.com' },
    { name: 'Steam', img: steamPng, link: 'store.steampowered.com' },
    {
      name: 'PlayStation Store',
      img: playstationPng,
      link: 'store.playstation.com',
    },
    { name: 'Google Play', img: googlePlayPng, link: 'play.google.com' },
    { name: 'App Store', img: appStorePng, link: 'apps.apple.com' },
    { name: 'GOG', img: gogPng, link: 'gog.com' },
    { name: 'Nintendo Store', img: nintendoPng, link: 'nintendo.com' },
  ],
};

export type InitialState = typeof initialState;

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
