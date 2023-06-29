export const BASE_URL = "https://auth.nomoreparties.co";

//функция с общим кодом
const makeRequest = (url, method, body, token) => {
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  //не все запросы содержат боди,проверяем
  if (body) {
    options.body = JSON.stringify(body);
  }

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${BASE_URL}${url}`, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(`Ошибка ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const registration = (email, password) => {
  return makeRequest("/signup", "POST", {
    email,
    password,
  });
};

export const authorization = (email, password) => {
  return makeRequest("/signin", "POST", {
    email,
    password,
  });
};

export const checkToken = (token) => {
  return makeRequest("/users/me", "GET", null, token);
};
