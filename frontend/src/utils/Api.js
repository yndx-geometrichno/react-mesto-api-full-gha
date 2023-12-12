const apiConfig = {
  url: "https://api.bestfrontend.here.nomoredomainsmonster.ru",
  headers: {
    "Content-type": "application/json",
  },
  credentials: "include",
};
class Api {
  constructor({ url, headers, credentials }) {
    this._url = url;
    this._headers = headers;
    this._credentials = credentials;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endpoint, options) {
    return fetch(`${this._url}${endpoint}`, options).then(this._getResponse);
  }

  getInitialCards() {
    return this._request(`/cards`, {
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  getUserInfo() {
    return this._request(`/users/me`, {
      headers: this._headers,
      credentials: "include",
    });
  }

  updateUserInfo({ name, about }) {
    return this._request(`/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  updateAvatar({ avatar }) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  addNewCard({ name, link }) {
    return this._request(`/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._request(`/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
        credentials: this._credentials,
      });
    } else {
      return this._request(`/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
        credentials: this._credentials,
      });
    }
  }
}

export const api = new Api(apiConfig);
