import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="" />
      {props.isLoggedIn ? (
        <div className="header__authorized">
          <p className="header__email">{props.email}</p>
          <Link to="/signin" onClick={props.logOut} className="header__link">
            Выйти
          </Link>
        </div>
      ) : (
        <div>
          {location.pathname === "/signin" ? (
            <Link to="signup" className="header__link">
              {" "}
              Регистрация{" "}
            </Link>
          ) : null}
          {location.pathname === "/signup" ? (
            <Link to="signin" className="header__link">
              Войти
            </Link>
          ) : null}
        </div>
      )}
    </header>
  );
}
