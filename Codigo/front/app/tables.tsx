type Fornecedor = {
    id: number;
    tipo: "PJ" | "PF";
    email: string;
    telefone?: string;
    celular?: string;
    cep: string;
    logradouro: string;
    bairro?: string;
    numero?: number;
    complemento?: string;
    estado: string;
    cidade: string;
    ativo: boolean;
    notas?: string;
}

type Fornecedor_PJ = Fornecedor & {
    cnpj: number;
    razao_social: string;
    nome_fantasia?: string;
}

type Fornecedor_PF = Fornecedor & {
    cpf: number;
    nome: string;
}

type Usuario = {
    id: number;
    usuario: string;
    nome: string;
    email: string;
    cargo: "administrador" | "gerente";
    senha: string;
}
