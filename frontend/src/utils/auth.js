const contentType = {
  "Accept": 'application/json',
  "Content-type": "application/json",
};

// export const BASE_URL = "bestfrontend.here.nomoredomainsmonster.ru";
export const BASE_URL = "https://api.bestfrontend.here.nomoredomainsmonster.ru";

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
    credentials: "include",
    headers: contentType,
    body: JSON.stringify({ password, email }),
  }).then((data) => {
    if (data.user._id) {
      localStorage.setItem("userId", data.user._id);
      return data;
    }
  });
};

export const logout = () => {
  return request("/signout", {
    method: "POST",
    credentials: "include",
    headers: contentType,
  })
}

export const checkToken = (token) => {
  return request("/users/me", {
    headers: { contentType },
    credentials: "include",
  }).then((data) => data);
};
