import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";

export default function Main(props) {
//Получаем объект текущего пользователя, используем avatar,name,about сразу в разметке
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-area" style={{ backgroundImage: `url(${currentUser.avatar})` }} >
          <button
            className="profile__avatar-button"
            type="button"
            aria-label="Обновить аватар"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            className="profile__button"
            type="button"
            aria-label="Редактировать профиль"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          aria-label="Добавить"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <ul className="elements">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardDelete={props.onCardDelete}
              onCardLike = {props.onCardLike}
            />
          );
        })}
      </ul>
    </main>
  );
}
