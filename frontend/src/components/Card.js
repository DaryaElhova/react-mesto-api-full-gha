import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
 const currentUser = React.useContext(CurrentUserContext);
 // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  //i-объект с информацией о пользователе лайкнувшем карточку. Возвращает true/false
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = ( 
    `elements__icon ${isLiked && 'elements__icon_active'}` 
  );

  function handleClick(){
  onCardClick(card);
 }

  function handleLikeClick(){
    onCardLike(card);
  }

  function handleCardDelete(){
    onCardDelete(card._id);
  }

  return (
    <li className="elements__element">
     {/* Далее в разметке используем переменную для условного рендеринга. Кнопка удаления будет показано только если карточка currentUser'a*/}
      {isOwn && <button className="elements__btn-delete" type="button" aria-label="Удалить" onClick={handleCardDelete}></button>} 
      
      <img className="elements__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="elements__caption">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like">
          <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={handleLikeClick}></button>
          <p className="elements__counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}
