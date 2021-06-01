import { IGameItem } from '../../interfaces/interfaces';
import { ADD_LIST_ITEM, REMOVE_LIST_ITEM } from '../../types/listTypes';
import { Actions } from '../actions/list';

const initialState = {
  listItems: [] as Array<IGameItem>,
};

export type InitialState = typeof initialState;

export const listReducer = (state = initialState, action: Actions): InitialState => {
  switch (action.type) {
    case ADD_LIST_ITEM: {
      let newItems: Array<IGameItem> = [...state.listItems];
      let ids: number[] = [];

      if (state.listItems.length > 0) {
        state.listItems.forEach((obj) => {
          if (obj.id === action.payload.id) {
            ids.push(obj.id);
          }
        });
      }

      if (state.listItems.length === 0 || ids[ids.length - 1] !== action.payload.id) {
        newItems.push(action.payload);
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

    default:
      return state;
  }
};
