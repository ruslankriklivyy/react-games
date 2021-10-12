import axios from 'axios';
import {
  IGamesResponse,
  IGenresPresponse,
  IOneGameItemResponse,
  IScreenshotsResponse,
} from '../interfaces/interfaces';
import { FetchScreenshots } from '../redux/actions/games';

const games = axios.create({
  baseURL: 'https://api.rawg.io/api/',
});

const api_key = 'key=722c9d0913da4424a89ab6e326074614';

export const fetchScreenshotsFromApi = (payload: string | null): Promise<IScreenshotsResponse> =>
  games.get(`games/${payload}/screenshots?${api_key}`);

export const fetchOneGameFromApi = (id: number | null): Promise<IOneGameItemResponse> =>
  games.get(`games/${id}?${api_key}`);

export const fetchGenresFromApi = (): Promise<IGenresPresponse> => games.get(`genres?${api_key}`);

export const fetchGamesFromApi = (
  genreName: string,
  quearySearch: string,
  pageNumber: number,
  orderBy: string,
): Promise<IGamesResponse> =>
  games.get(
    `games?${api_key}${quearySearch !== '' ? `&search=${quearySearch}` : ''}${
      genreName !== '' ? `&genres=${genreName}` : ''
    }&ordering=-${orderBy.toLowerCase()}&page=${pageNumber}`,
  );
