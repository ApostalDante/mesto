class Api {
  constructor({ link, headers }) {
    this._link = link;
    this._headers = headers;
  };

  _responseProcessingServer(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  };

  getCardsServer() {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
      method: 'GET',
    })
      .then(res => { return this._responseProcessingServer(res); })
  };

  addNewCardToServer({ name, link }) {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name, link })
    })

      .then(res => { return this._responseProcessingServer(res); })
  };

  deleteCardInServer(cardId) {
    return fetch(`${this._link}cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(res => { return this._responseProcessingServer(res); })
  };

  getProfileDataInServer() {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
      method: 'GET',
    })
      .then(res => { return this._responseProcessingServer(res); })
  };

  sendProfileDataToServer(profileData) {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ name: profileData['user-name'], about: profileData['user-myself'] })
    })
      .then(res => { return this._responseProcessingServer(res); })
  };

  sendAvatarDataToServer(avatarData) {
    return fetch(`${this._link}users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: avatarData['avatar-url'] })
    })
      .then(res => { return this._responseProcessingServer(res); })
  };

  sendLikeCardToServer(cardId) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then(res => { return this._responseProcessingServer(res); })
  };

  deleteLikeCardToServer(cardId) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(res => { return this._responseProcessingServer(res); })
  };
};

export default Api;