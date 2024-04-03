const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('boutique_das_carnes', 'root', 'password', {
    define: {
        freezeTableName: true
    },
    host: 'mariadb',
    dialect: 'mariadb',
    port: 3306
});

async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}

module.exports = {
    connect,
    sequelize
}