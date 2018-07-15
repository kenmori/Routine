import { select, all, take, fork, call, put } from "redux-saga/effects";
import { get, post } from "../utils/api";
import { REQUEST, successGet, failuer } from "../modules/photo";
export const selectorPhotoState = state => state.photo.selectedFiles;

export function* getPhoto() {
  while (true) {
    const faf = yield take(REQUEST);
    const [status, data, error] = yield call(get, "images/");
    if (data && !error) {
      console.log("data--------", data);
      yield put(successGet(data));
    } else {
      yield put(failur(error));
    }
  }
}

export function* postPhoto(action) {
  while (true) {
    yield take("photo/POST");
    const selectedFiles = yield select(selectorPhotoState);
    const formData = new FormData();
    formData.append("myFile", selectedFiles[0], "filenamehere");
    try {
      const fetchResult = yield call(post, formData);
      //dataの状態に寄って下記を分岐する
      yield put({ type: "photo/SUCCESS", status: "success" });
    } catch (e) {
      yield put({ type: "pohto/FAILUER", error: e.message });
    }
  }
}

export default function* rootSaga() {
  yield all(fork(getPhoto), fork(postPhoto));
}
