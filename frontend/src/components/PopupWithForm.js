//компонент принимает пропсы title, name и isOpen,onClose (для обработки события закрытия попапа), а также проп children, который содержит вложенную разметку для формы. Пропс isOpen используем для задания класса открытого попапа
import Popup from './Popup.js';

export default function PopupWithForm({isOpen, name, onClose, ...props}) {
  return (
    <Popup
      isOpen={isOpen}
      name={name}
      onClose={onClose}
      >
      <form name={props.name} className="form popup__form" onSubmit={props.onSubmit} noValidate>
          <h2 className="popup__header">{props.title}</h2>
          {/* в чилдрен отличное от базового содержание формы */}
          {props.children}
          {/* почти везде текст кнопки сохранить,поэтому можно использовать {props.text || 'Сохранить'} */}
        <button className="popup__btn" type="submit">{props.text || 'Сохранить'}</button>
      </form>
    </Popup>
  )
}
