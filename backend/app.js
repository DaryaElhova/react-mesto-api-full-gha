require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const { loginUser, createUser } = require('./controllers/users');
const { validateAuth, validateCreateUser } = require('./middlwares/validate');
const NotFound = require('./utils/errors-constructor/NotFound');
const { errorHandler } = require('./middlwares/error-handler');
const { requestLogger, errorLogger } = require('./middlwares/logger');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1/mestodb')
  .then(() => {
    console.log('Connecting...');
  })
  .catch((err) => {
    console.log(`Ошибка ${err.message}`);
  });

const app = express();
app.use(cors());
app.use(express.json());

// подключать до всех обработчиков роутов
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateAuth, loginUser);
app.post('/signup', validateCreateUser, createUser);
app.use(cardRouter);
app.use(userRouter);

app.use((req, res, next) => {
  next(new NotFound('Not Found'));
});

// после роутов и перед обработчиками ошибок
app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
