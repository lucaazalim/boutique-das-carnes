const express = require('express');
const app = express();
const api = require('./routes/api');

app.use(express.json())
app.use(api);

app.use('/', (req, res, next) => {
    console.log('request made on "/"');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;