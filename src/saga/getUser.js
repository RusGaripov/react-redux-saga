import { put, takeEvery, call } from "redux-saga/effects";
import { FETCH_USER } from "../store/actions";
import { setUser } from "../store/reducers/userReducer";

const fetchUserFromApi = () =>
  fetch("https://graphqlzero.almansi.me/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        user(id: 2) {
            id
            username
            email
            address {
              geo {
                lat
                lng
              }
            }
          }
      }`,
    }),
  });

function* fetchUserWorker() {
  const data = yield call(fetchUserFromApi);
  const json = yield call(() => new Promise((res) => res(data.json())));
  yield put(setUser(json));
}
export function* userWatcher() {
  yield takeEvery(FETCH_USER, fetchUserWorker);
}
