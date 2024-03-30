// arquivo: services/fornecedor.service.js

module.exports = function respostaFornecedor(fornecedor, pessoaF, pessoaJ, contatos) {

    let pessoa = null;

    if (pessoaF === undefined && pessoaJ === undefined) {
        pessoa = {};
    } else {
        pessoa = fornecedor.tipo === 'PF' ? {
            cpf: pessoaF.cpf,
            nome: pessoaF.nome
        } : {
            cnpj: pessoaJ.cnpj,
            razao_social: pessoaJ.razao_social,
            nome_fantasia: pessoaJ.nome_fantasia
        };
    }

    return {
        id: fornecedor.id,
        tipo: fornecedor.tipo,
        pessoa: pessoa,
        email: fornecedor.email,
        telefone: fornecedor.telefone,
        celular: fornecedor.celular,
        cep: fornecedor.cep,
        logradouro: fornecedor.logradouro,
        bairro: fornecedor.bairro,
        numero: fornecedor.numero,
        complemento: fornecedor.complemento,
        estado: fornecedor.estado,
        cidade: fornecedor.cidade,
        ativo: fornecedor.ativo,
        notas: fornecedor.notas,
        contatos: contatos
    };
}