const contentType = {
  "Content-type": "application/json",
};

// export const BASE_URL = "bestfrontend.here.nomoredomainsmonster.ru";
export const BASE_URL = "";

function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function request(endpoint, options) {
  return fetch(`${BASE_URL}${endpoint}`, options).then(getResponse);
}

export const register = (password, email) => {
  return request("/signup", {
    method: "POST",
    headers: contentType,
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return res;
  });
};

export const authorize = (password, email) => {
  return request("/signin", {
    method: "POST",
    headers: contentType,
    body: JSON.stringify({ password, email }),
  }).then((data) => {
    if (data.token) {
      localStorage.setItem("jwt", data.token);
      return data;
    }
  });
};

export const checkToken = (token) => {
  return request("/users/me", {
    headers: { contentType, Authorization: `Bearer ${token}` },
  }).then((data) => data);
};
