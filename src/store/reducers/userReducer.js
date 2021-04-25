import * as actions from "../actions";

const defaultState = {
  user: [],
};

export function userReducer(state = defaultState, action) {
  switch (action.type) {
    case actions.GET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export const setUser = (payload) => ({ type: actions.GET_USER, payload });
export const fetchUser = () => ({ type: actions.FETCH_USER });
