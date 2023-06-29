import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";

const Register = ({ registerUser }) => {
  const { form, handleChange } = useForm({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    registerUser(form);
    navigate("/signin", { replace: true });
  };

  return (
    <div className="register">
      <h3 className="register__title">Регистрация</h3>
      <form className="register__form" onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input
            className="register__input"
            id="email"
            required
            name="email"
            type="email"
            value={form.email || ""}
            minLength={3}
            placeholder="Email"
            onChange={handleChange}
          />
          <span></span>
        </label>
        <label htmlFor="password">
          <input
            className="register__input"
            id="password"
            required
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password || ""}
            minLength={6}
            placeholder="Пароль"
            onChange={handleChange}
          />
          <span></span>
        </label>
        <button className="register__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <p className="register__login-title">Уже зарегистрированы?&nbsp;</p>
        <Link to="/signin" className="register__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
