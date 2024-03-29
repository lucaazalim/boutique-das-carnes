const http = require('http');
const app = require('./app');
const { connectToDatabase } = require('./services/mariadb.service')

const port = 3001;

const server = http.createServer(app);

connectToDatabase();

server.listen(port, () => {
    console.log(`Example app listening on port: ${port}`)
});