const http = require('http');
const app = require('./app');
const { connctionDB } = require('./services/mariadb')

const port = 3001;

const server = http.createServer(app);

connctionDB();

server.listen(port, () => {
    console.log(`Example app listening on port: ${port}`)
});