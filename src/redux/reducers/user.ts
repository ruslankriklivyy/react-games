import { IUser } from '../../interfaces/interfaces';
import { SET_IS_AUTH, SET_USER } from '../../types/userTypes';
import { Actions } from '../actions/user';

const initialState = {
  user: {} as IUser,
  isAuth: false as boolean,
};

export type InitialState = typeof initialState;

export const userReducer = (state = initialState, action: Actions): InitialState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.payload,
      };

    default:
      return state;
  }
};
