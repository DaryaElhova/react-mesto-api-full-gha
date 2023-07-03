import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import * as Auth from "../utils/Auth.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";
import React from "react";
import { useEffect, useState } from "react";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { EditProfilePopup } from "./EditProfilePopup.js";
import { EditAvatarPopup } from "./EditAvatarPopup.js";
import { AddPlacePopup } from "./AddPlacePopup.js";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  //стейты register and authorize
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const navigate = useNavigate();

  useEffect( () => {
    const token = localStorage.getItem('jwt');
    if (token) { Promise.all([ api.getUserInfoApi(), api.getCardsApi() ])
      .then(( [ user, cards] ) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch( (err) => { console.log(`Возникла ошибка, ${err}`) })
    }
  }, [isLoggedIn])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(
      (cardItem) => cardItem === currentUser._id
    );
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Возникла ошибка ${err}`);
      });
  }

  function handleCardDelete(id) {
    api
      .deleteCardApi(id)
      .then(() => {
        const updatedCards = cards.filter((card) => card._id !== id);
        setCards(updatedCards);
      })
      .catch((err) => {
        console.log(`Возникла ошибка ${err}`);
      });
  }

  function handleUpdateAvatar(avatarLink) {
    api
      .changeAvatarApi(avatarLink)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Возникла ошибка ${err}`);
      });
  }

  function handleUpdateUser(userData) {
    api
      .updateUserInfo(userData.name, userData.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Возникла ошибка ${err}`);
      });
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .addNewCardApi(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Возникла ошибка ${err}`);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setTooltipOpen(false);
  }

  //регистрация и авторизация---------------
  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      Auth.checkToken(jwt)
        .then((data) => {
          setUserEmail(data.email);
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        })
    }
  }

  const registerUser = ({ email, password }) => {
    Auth.registration(email, password)
      .then((res) => {
        if (res.status === 409) {
          throw new Error("Конфликт");
        }
        setSuccess(true);
        setTooltipOpen(true);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        setTooltipOpen(true);
        setSuccess(false);
      });
  };

  const loginUser = ({ email, password }) => {
    Auth.authorization(email, password)
      .then((res) => {
        setUserEmail(email);
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        navigate("/");
        setCurrentUser(res);
        setCards([]);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  };

  const logOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserEmail("");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <div className="page">
          <Header isLoggedIn={isLoggedIn} email={userEmail} logOut={logOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  path="/"
                  loggedIn={isLoggedIn}
                  component={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
            <Route
              path="/signin"
              element={<Login loginUser={loginUser} />}
            ></Route>
            <Route
              path="/signup"
              element={<Register registerUser={registerUser} />}
            ></Route>
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <PopupWithForm name="confirm" title="Вы уверены?"></PopupWithForm>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup 
            card={selectedCard}
            onClose={closeAllPopups}
            />
          <InfoTooltip
            success={success}
            isOpen={tooltipOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
