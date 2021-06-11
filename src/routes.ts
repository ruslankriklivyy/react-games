import { GamePage, HomePage, ListPage, LoginPage } from './pages';
import { HOME_ROUTE, LOGIN_ROUTE, GAME_ROUTE, LIST_ROUTE } from './utils/consts';

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: LoginPage,
  },
];

export const privateRoutes = [
  {
    path: LIST_ROUTE,
    Component: ListPage,
  },
  {
    path: GAME_ROUTE,
    Component: GamePage,
  },
  {
    path: HOME_ROUTE,
    Component: HomePage,
  },
];
