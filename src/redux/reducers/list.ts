import { IGameItem } from '../../interfaces/interfaces';
import { addGame } from '../../service/games';
import { ADD_LIST_ITEM, REMOVE_LIST_ITEM, SET_LIST } from '../../types/listTypes';
import { Actions } from '../actions/list';

const initialState = {
  listItems: [] as IGameItem[],
};

export type InitialState = typeof initialState;

export const listReducer = (state = initialState, action: Actions): InitialState => {
  switch (action.type) {
    case ADD_LIST_ITEM: {
      let newItems: IGameItem[] = [...state.listItems];
      let ids: number[] = [];

      if (state.listItems.length > 0) {
        state.listItems.forEach((obj) => {
          if (obj.id === action.payload.id) {
            ids.push(obj.id);
            addGame(obj);
          }
        });
      }

      if (state.listItems.length === 0 || ids[ids.length - 1] !== action.payload.id) {
        newItems.push(action.payload);
        addGame(action.payload);
      }

      return {
        ...state,
        listItems: newItems,
      };
    }

    case REMOVE_LIST_ITEM: {
      const newItems = state.listItems.filter((obj) => obj.id !== action.payload);

      return {
        ...state,
        listItems: newItems,
      };
    }

    case SET_LIST:
      return {
        ...state,
        listItems: [...state.listItems, action.payload],
      };

    default:
      return state;
  }
};
