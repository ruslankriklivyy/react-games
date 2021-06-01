import { IGameItem } from '../../interfaces/interfaces';
import { ADD_LIST_ITEM, REMOVE_LIST_ITEM } from '../../types/listTypes';

interface AddItemToList {
  type: typeof ADD_LIST_ITEM;
  payload: IGameItem;
}
export const addItemToList = (obj: IGameItem): AddItemToList => ({
  type: ADD_LIST_ITEM,
  payload: obj,
});

interface RemoveItemToList {
  type: typeof REMOVE_LIST_ITEM;
  payload: number;
}
export const removeItemToList = (id: number): RemoveItemToList => ({
  type: REMOVE_LIST_ITEM,
  payload: id,
});

export type Actions = AddItemToList | RemoveItemToList;
