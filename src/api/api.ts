import axios from 'axios';
import { FetchScreenshots } from '../redux/actions/games';

const games = axios.create({
  baseURL: 'https://api.rawg.io/api/',
});

const api_key = 'key=722c9d0913da4424a89ab6e326074614';

export const fetchScreenshotsFromApi = (action: FetchScreenshots) =>
  games.get(`games/${action.payload}/screenshots?${api_key}`).then(({ data }) => {
    return data;
  });

export const fetchOneGameFromApi = (id: number | null) =>
  games.get(`games/${id}?${api_key}`).then(({ data }) => {
    return data;
  });

export const fetchGenresFromApi = () =>
  games.get(`genres?${api_key}`).then(({ data }) => {
    return data;
  });

export const fetchGamesFromApi = (
  genreName: string,
  quearySearch: string,
  pageNumber: number,
  orderBy: string,
) =>
  games
    .get(
      `games?${api_key}${quearySearch !== '' ? `&search=${quearySearch}` : ''}${
        genreName !== '' ? `&genres=${genreName}` : ''
      }&ordering=-${orderBy.toLowerCase()}&page=${pageNumber}`,
    )
    .then(({ data }) => {
      return data;
    });
