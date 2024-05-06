const {
    getAllEstoque,
    getSummary,
} = require('../../models/estoque/estoque.model');


async function httpGetAllEstoque(req, res) {
    try {
        const estoque = await getAllEstoque();
        res.status(200).json(estoque);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function httpGetSummary(req, res) {
    try {
        const summary = await getSummary();
        res.status(200).json(summary);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports = {
    httpGetAllEstoque,
    httpGetSummary,
}
