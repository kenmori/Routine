import { select, all, take, fork, call, put } from "redux-saga/effects";
const Api = {
  get(action) {
    fetch("http://localhost:3004/photos", {})
      .then(res => {
        return res.json();
      })
      .then(myjson => {
        console.log(myjson);
      });
  },
  post(action) {
    fetch("http://localhost:3004/photos", {
      method: "POST",
      data: action
    })
      .then(res => {
        return res.json();
      })
      .then(myjson => {
        console.log(myjson);
      });
  }
};

function* fetchPhoto(action) {
  try {
    yield put({ type: "photo/SUCCESS", entities: action.payload });
  } catch (e) {
    yield put({ type: "pohto/FAILUER", error: e.message });
  }
}

export const getPhoto = state => console.log(state) || state.photo;
function* postPhoto(action) {
  while (true) {
    const action = yield take("photo/POST");
    const state = yield select(getPhoto);
    const formData = new FormData();
    formData.append("myFile", state.selectedFiles, "filenamehere");
    try {
      const photo = yield call(Api.post, formData);
      yield put({ type: "photo/SUCCESS", entities: photo });
    } catch (e) {
      yield put({ type: "pohto/FAILUER", error: e.message });
    }
  }
}

function* rootSaga() {
  yield all([fork(fetchPhoto), fork(postPhoto)]);
}

export default rootSaga;
