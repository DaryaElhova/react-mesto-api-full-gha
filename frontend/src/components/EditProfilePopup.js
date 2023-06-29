import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function EditProfilePopup({isOpen, onClose, onUpdateUser}){
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e){
    setName(e.target.value);
  }

  function handleDescriptionChange(e){
    setDescription(e.target.value);
  }

// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if(!isOpen){
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isOpen, currentUser.name, currentUser.about])

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description
    });
  } 

  return(
    <PopupWithForm
    name="edit_profile"
    title="Редактировать профиль"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >
    <input
      className="popup__field popup__field_type_name"
      type="text"
      id="name-input"
      value={name || ""}
      onChange={handleNameChange}
      placeholder="ФИО"
      required
      minLength="2"
      maxLength="40"
      name="name"
    />
    <span className="name-input-error popup__error"></span>
    <input
      className="popup__field popup__field_type_job"
      type="text"
      id="job-input"
      value={description || ""}
      onChange={handleDescriptionChange}
      placeholder="Чем занимаетесь?"
      required
      minLength="2"
      maxLength="200"
      name="info"
    />
    <span className="popup__input-error job-input-error popup__error"></span>
  </PopupWithForm>
  )
}