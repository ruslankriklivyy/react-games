import { IUser } from '../../interfaces/interfaces';
import { SET_IS_AUTH, SET_USER } from '../../types/userTypes';

interface SetUser {
  type: typeof SET_USER;
  payload: IUser;
}
export const setUser = (user: IUser): SetUser => ({ type: SET_USER, payload: user });

interface SetIsAuth {
  type: typeof SET_IS_AUTH;
  payload: boolean;
}
export const setIsAuth = (isAuth: boolean): SetIsAuth => ({ type: SET_IS_AUTH, payload: isAuth });

export type Actions = SetUser | SetIsAuth;
