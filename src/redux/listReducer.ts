import { IGameItem } from './gamesReducer';

const initialState = {
  listItems: [] as Array<IGameItem>,
};

export type InitialState = typeof initialState;

const ADD_LIST_ITEM = 'ADD_LIST_ITEM';
const REMOVE_LIST_ITEM = 'REMOVE_LIST_ITEM';

export const listReducer = (state = initialState, action: any): InitialState => {
  switch (action.type) {
    case ADD_LIST_ITEM: {
      let newItems: Array<IGameItem> = [...state.listItems];
      let ids: any = [];

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

export const addItemToList = (obj: IGameItem) => ({ type: ADD_LIST_ITEM, payload: obj });
export const removeItemToList = (id: number) => ({ type: REMOVE_LIST_ITEM, payload: id });
