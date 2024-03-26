const express = require('express');
const app = express();

app.use('/', (req, res, next) => {
    console.log('request made on "/"');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;