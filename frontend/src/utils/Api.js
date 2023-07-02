class Api{
  constructor(basePath){
      this._basePath = basePath;
  }

//Метод,который позволяет не дублировать заголовки
_getHeaders(){
  return {
    "Content-Type" : "application/json",
    authorization: `Bearer ${ localStorage.getItem('token') }`
  }
}

//Метод,который позволит не дублировать код на проверку запроса
_getJson(res){
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка${res.status}`);
}

//Метод загрузки карточек с сервера
getCardsApi(){
  return fetch(`${this._basePath}/cards`, {
    headers: this._getHeaders()
  }).then(this._getJson)
}

//Метод загрузки информации о пользователе с сервера
getUserInfoApi(){
  return fetch(`${this._basePath}/users/me`, {
    headers: this._getHeaders(),
  }).then(this._getJson)
}

//Метод редактирования данных профиля
updateUserInfo(userName, userAbout){
  return fetch(`${this._basePath}/users/me`, {
    method: "PATCH",
    headers: this._getHeaders(),
    body: JSON.stringify({
      name: userName,
      about: userAbout
    })
  }).then(this._getJson)
}

//Метод добавления новых карточек
addNewCardApi(cardData){
  return fetch(`${this._basePath}/cards`, {
    method: "POST",
    headers: this._getHeaders(),
    body: JSON.stringify({
      name: cardData.region,
      link: cardData.link
    })
  }).then(this._getJson)
}

deleteCardApi(cardId){
  return fetch(`${this._basePath}/cards/${cardId} `, {
    method: "DELETE",
    headers: this._getHeaders(),
  }).then(this._getJson);
}

//общий метод управления лайками
changeLikeCardStatus(cardId, isLiked){
  if (isLiked) {
    return fetch(`${this._basePath}/cards/${cardId}/likes`,{
      method: "PUT",
      headers: this._getHeaders(),
    }).then(this._getJson);
  } else {
    return fetch(`${this._basePath}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJson);
  }
}

changeAvatarApi(avatarLink) {
  return fetch(`${this._basePath}/users/me/avatar`, {
    method: "PATCH",
    headers: this._getHeaders(),
    body: JSON.stringify({ avatar: avatarLink.avatar })
  }).then(this._getJson);
}

}

const api = new Api(
  "https://api.mesto.elkhova.nomoreparties.sbs",
);

export default api;
