import { select, all, take, fork, call, put } from "redux-saga/effects";
const Api = {
  get(action) {
    console.log();
    fetch("http://localhost:3000/photos/", {})
      .then(res => {
        return res.json();
      })
      .then(myjson => {
        console.log(myjson);
      });
  },
  post(action) {
    console.log("post", action);
    const formData = new FormData(action);
    fetch("http://localhost:3000/photos/", {
      method: "POST",
      body: formData
    })
      .then(res => {
        console.log("res", res);
        return res.json();
      })
      .then(myjson => {
        console.log("then", myjson);
      });
  }
};

function* fetchPhoto(action) {
  try {
    yield put({ type: "photo/SUCCESS", status: action.payload });
  } catch (e) {
    yield put({ type: "pohto/FAILUER", status: e.message });
  }
}

export const getPhoto = state => state.photo.selectedFiles;
function* postPhoto(action) {
  while (true) {
    const action = yield take("photo/POST");
    const selectedFiles = yield select(getPhoto);
    console.log("selectedFiles", selectedFiles);
    const formData = new FormData();
    formData.append("myFile", selectedFiles[0], "filenamehere");
    console.log(formData);
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
