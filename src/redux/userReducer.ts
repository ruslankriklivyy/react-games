const initialState = {
  token: {} as object,
};

export type InitialState = typeof initialState;

const SET_TOKEN = 'SET_TOKEN';
export const FETCH_TOKEN = 'FETCH_TOKEN';

export const userReducer = (state = initialState, action: any): InitialState => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
};

export const setToken = (token: any) => ({ type: SET_TOKEN, payload: token });
export const fetchToken = () => ({ type: FETCH_TOKEN });
