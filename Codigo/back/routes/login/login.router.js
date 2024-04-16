const express = require('express');
const loginRouter = express.Router();
const { httpLogin } = require('./login.controller');

loginRouter.post('/', httpLogin);

exports.loginRouter = loginRouter;