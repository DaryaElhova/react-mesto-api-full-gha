import React from "react";
import registered from "../images/registered.svg";
import fail from "../images/fail.svg";

const InfoTooltip = (props) => {

  return (
    <div
      className={`popup ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        />
        {/* <div className="info"> */}
        {props.success && (
            <>
              <img className="info__logo" src={registered} alt="зарегистрирован" />
              <p className="info__title">Вы успешно зарегистрировались!</p>
            </>
          )}
          {!props.success && (
            <>
              <img className="info__logo" src={fail} alt="произошла ошибка"/>
              <p className="info__title">
                Что-то пошло не так! Попробуйте ещё раз.
              </p>
            </>
          )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default InfoTooltip;