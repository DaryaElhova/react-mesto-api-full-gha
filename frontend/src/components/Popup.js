import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, children }) => {
  //`useEffect` для обработчика `Escape`
  useEffect(() => {
    // если попап не открыт,обработчик не нужен
    if (!isOpen) return;
    // функц.закрытия по esc
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
    //в зависимостях isOpen, чтобы аботало на открытим попапе
  }, [isOpen, onClose]);

  // закрытие по клику на оверлей
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // внутри верстка обертки любого попапа с классом `popup` и добавлением `popup_opened`.
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup__${name}`} 
      // добавляем обработчик оверлея
      onClick={handleOverlay}
    >
      <div className="popup__container">
      {children}
    {/* крестик закрытия есть во всех попапах,включаем в базовую обертку */}
      <button className="popup__close" type="button" onClick={onClose} />     {" "}
      </div>
      </div>
  );
};

export default Popup;
