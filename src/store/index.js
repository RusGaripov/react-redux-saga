import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import { userWatcher } from "../saga/getUser";
const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
export default createStore(
  reducers,
  enhancers(applyMiddleware(thunk, sagaMiddleware))
);
sagaMiddleware.run(userWatcher);
