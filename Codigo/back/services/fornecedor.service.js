module.exports = function respostaFornecedor(fornecedor, updateValue) {

    let pessoa = null;
    let resposta = fornecedor.dataValues;

    if (updateValue === undefined) {
        pessoa = {};
    } else {
        pessoa = updateValue.dataValues;
    }

    resposta.pessoa = pessoa;

    return resposta;
}