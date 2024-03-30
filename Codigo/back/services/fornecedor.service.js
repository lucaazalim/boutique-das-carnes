module.exports = function respostaFornecedor(fornecedor, updateValue, contatos) {

    let pessoa = null;
    let resposta = fornecedor.dataValues;

    if (updateValue === undefined) {
        pessoa = {};
    } else {
        pessoa = updateValue.dataValues;
    }

    resposta.pessoa = pessoa;
    resposta.contato = contatos;

    return resposta;
}