function statusHelper(response) {
  if (response.status >= 200 && response.status < 300) {
    console.log("response ---------------------------", response);
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}
export function get(url) {
  return fetch(`http://localhost:3000/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.status === 204) {
        return { status: response.status, json: "json" };
      } else if (response.status === 503) {
        return {
          status: response.status,
          json: {
            datail:
              "ただいまシステムメンテナンス中のため、サービスがご利用頂けません。"
          }
        };
      } else {
        return response.json().then(json => ({
          status: response.status,
          json: json
        }));
      }
    })
    .then(({ status, json }) => {
      return responseHandler(status, json);
    });
}

const responseHandler = (status, json) => {
  if (status < 300) {
    return [status, json, undefined];
  } else {
    if (status === 401) history.push("/login");
    return [status, undefined, json];
  }
};

export function post(formData) {
  //webとnativeで送られるFileオブジェクトが違う
  fetch("http://localhost:3000/photos/", {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    method: "POST",
    body: formData
  })
    .then(statusHelper)
    .then(res => {
      return res.json();
    })
    .catch(error => console.error("Error:", error))
    .then(myjson => myjson);
}
