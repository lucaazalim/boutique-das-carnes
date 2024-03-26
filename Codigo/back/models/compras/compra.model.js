const { Model } = require('sequelize');
const Compra = require('./compra.sequelize');

async function httpGetAllCompras(){
    return await Compra.findAll();
}


module.exports = {
    httpGetAllCompras
} 