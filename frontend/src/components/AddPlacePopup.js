import React, {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

export function AddPlacePopup({isOpen, onClose, onAddPlace}){
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    if(!isOpen){
      setName('');
      setLink('');
    }
  }, [isOpen])

  function handleSubmit(e){
    e.preventDefault();
    onAddPlace({
      region: name,
      link: link
    })
  }

  return(
    <PopupWithForm
      name="add_card"
      title="Новое место"
      text="Добавить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit = {handleSubmit}
    >
      <input
        className="popup__field popup__field_type_region"
        type="text"
        id="region-input"
        value={name}
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        name="region"
        onChange={handleNameChange}
      />
      <span className="region-input-error popup__error"></span>
      <input
        className="popup__field popup__field_type_link"
        type="url"
        id="image-input"
        value={link}
        placeholder="Ссылка на картинку"
        required
        name="link"
        onChange={handleLinkChange}
      />
      <span className="image-input-error popup__error"></span>
    </PopupWithForm>
  )
}