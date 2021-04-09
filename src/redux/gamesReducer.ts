interface IGameScreenshots {
  id: number;
  image: string;
}

interface IPlatformsItem {
  id: number;
  name: string;
  slug: string;
}

interface IPlatforms {
  platform: IPlatformsItem;
}

interface IRequirements {
  minimum: string;
  recommended: string;
}

interface IPlatformsReq {
  platform: IPlatformsItem;
  released_at: string;
  requirements: IRequirements;
}

interface IGameDevelopers {
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
}

interface IStore {
  domain: string;
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
}

interface IStoresItem {
  id: number;
  store: IStore;
}

interface IPublishers {
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
}

interface IGameItem {
  added: number;
  added_by_status: any;
  background_image: string;
  website?: string;
  description_raw: string;
  stores: Array<IStoresItem>;
  developers: Array<IGameDevelopers>;
  clip: null;
  dominant_color: string;
  esrb_rating: any;
  genres: any;
  id: number;
  metacritic: number;
  name: string;
  description?: string;
  background_image_additional?: string;
  parent_platforms: Array<IPlatforms>;
  platforms: Array<IPlatformsReq>;
  playtime: number;
  publishers: Array<IPublishers>;
  rating: number;
  rating_top: number;
  ratings: any;
  ratings_count: number;
  released: string;
  reviews_count: number;
  reviews_text_count: number;
  saturated_color: string;
  short_screenshots: Array<IGameScreenshots>;
  slug: string;
  suggestions_count: number;
  tags: any;
  tba: boolean;
  updated: string;
  user_game: any;
}

interface IGames {
  count: number;
  description: string;
  filters: object;
  next: string;
  nofollow: boolean;
  nofollow_collections: Array<string>;
  noindex: boolean;
  previous: null;
  results: Array<IGameItem>;
  seo_description: string;
  seo_h1: string;
  seo_keywords: string;
  seo_title: string;
}

interface IGenresResults {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

interface IGenres {
  count: number;
  next: string;
  previous: string;
  results: Array<IGenresResults>;
}

const initialState = {
  items: {} as IGames,
  gameId: null as number | null,
  genres: {} as IGenres,
  chosenGame: {} as IGameItem,
  genreName: null as string | null,
  querySearch: '' as string,
};

export type InitialState = typeof initialState;

const SET_ITEMS = 'SET_ITEMS';
const SET_GENRES = 'SET_GENRES';
const SET_GENRE_NAME = 'SET_GENRE_NAME';
const SET_QUERY_SEARCH = 'SET_QUERY_SEARCH';
const SET_GAME_ID = 'SET_GAME_ID';
const SET_CHOSEN_GAME = 'SET_CHOSEN_GAME';
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_GENRES = 'FETCH_GENRES';
export const FETCH_ONE_GAME = 'FETCH_ONE_GAME';

export const gamesReducer = (state = initialState, action: any): InitialState => {
  switch (action.type) {
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload,
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

export const setGames = (items: IGames) => ({ type: SET_ITEMS, payload: items });
export const setGenres = (genres: IGenres) => ({ type: SET_GENRES, payload: genres });
export const setGenreName = (genreName: string) => ({ type: SET_GENRE_NAME, payload: genreName });
export const setChosenGame = (item: IGameItem) => ({ type: SET_CHOSEN_GAME, payload: item });
export const setGameId = (gameId: number) => ({ type: SET_GAME_ID, payload: gameId });
export const setQuearySearch = (quearySearch: string | null) => ({
  type: SET_QUERY_SEARCH,
  payload: quearySearch,
});
export const fetchGames = (genreName: string | null, quearySearch: string | null) => ({
  type: FETCH_ITEMS,
  genreName: genreName,
  quearySearch: quearySearch,
});
export const fetchGenres = () => ({ type: FETCH_GENRES });
export const fetchOneGame = (gameId: number | null) => ({ type: FETCH_ONE_GAME, payload: gameId });
