import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef(null);

  //Отслеживаем изменение isOpen. Когда становится false, то обновляем значение рефа на пустую строку
  useEffect(() => {
    if (!isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    onClose();
  }

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__field popup__field_type_update"
        type="url"
        id="update-avatar"
        defaultValue=""
        placeholder="Введите ссылку"
        required
        name="avatar"
        ref={avatarRef}
      />
      <span className="update-avatar-error popup__error"></span>
    </PopupWithForm>
  );
}
