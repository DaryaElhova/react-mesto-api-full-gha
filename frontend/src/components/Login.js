import React from "react";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";

const Login = ({ loginUser, handleLogin }) => {
  const { form, handleChange } = useForm({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    loginUser(form);
    navigate("/", { replace: true });
  };

  return (
    <div className="register">
      <h3 className="register__title">Вход</h3>
      <form className="register__form" onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input
            className="register__input"
            id="email"
            required
            name="email"
            type="email"
            minLength={3}
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
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
            minLength={6}
            placeholder="Пароль"
            onChange={handleChange}
            value={form.password}
          />
          <span></span>
        </label>
        <button className="register__button" type="submit">
          Вход
        </button>
      </form>
    </div>
  );
};

export default Login;
