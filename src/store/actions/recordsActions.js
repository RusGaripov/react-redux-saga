import * as actions from "./index";

var testObject = [];

export const getRecords = () => (dispatch) => {
  dispatch({ type: actions.GET_RECORDS, records: testObject });
};

export const addToRecords = (record, id) => async (dispatch) => {
  id = testObject.length + 1;
  testObject.push({ id: id, text: record });
  dispatch({ type: actions.ADD_RECORD });
};

export const removeFromRecords = (id) => async (dispatch) => {
  for (var i = 0; i < testObject.length; i++) {
    if (testObject[i].id === id) {
      testObject.splice(i, 1);
    }
  }
  dispatch({
    type: actions.DELETE_RECORD,
    record: null,
  });
};
