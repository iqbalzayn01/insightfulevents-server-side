const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const v1 = '/api/v1';
// Router
const usersRouter = require('./app/api/v1/users/router');

// Middlewares
const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).json({
    message: `Welcome to API SkillSync`,
  });
});

// App Router
app.use(`${v1}/cms`, usersRouter);

// App Middlewares
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
