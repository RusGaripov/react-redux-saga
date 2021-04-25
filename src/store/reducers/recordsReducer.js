import * as actions from "../actions";

const initialState = {
  records: null,
  record: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_RECORDS:
      return { ...state, records: action.records };
    case actions.ADD_RECORD:
      return { ...state, records: null };
    case actions.DELETE_RECORD:
      return { ...state, record: null };
    default:
      return state;
  }
};
