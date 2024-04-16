const express = require('express');
const cors = require('cors');
const package = require('./package.json');
const mariadb = require('./services/mariadb.service');

const app = express();
const api = require('./routes/api');

app.use(express.json());
app.use(cors());

app.use('/', (req, res, next) => next());
app.use(api);

app.get('/', (req, res) => {
    const { description, version } = package;
    res.json({ description, version })
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Boutique das Carnes API: http://localhost:${PORT}`)
});

mariadb.authenticate();

module.exports = app;