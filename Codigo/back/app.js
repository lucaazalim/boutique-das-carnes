const express = require('express');
const app = express();
const api = require('./routes/api');
const cors = require('cors');

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use('/', (req, res, next) => {
    console.log(`request made on: ${req.url}`);
    next();
});

app.use(api);

app.get('/', (req, res) => {
    res.send('Hello World!');
});



module.exports = app;