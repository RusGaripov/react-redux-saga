import { combineReducers } from "redux";
import recordsReducer from "./recordsReducer";
import { userReducer } from "./userReducer";
const rootReducer = combineReducers({ userReducer, recordsReducer });

export default rootReducer;
