# Documentação da API

## Paginação

As rotas de consulta de dados possuem suporte à parâmetros de paginação.

- **page**: Número da página a ser consultada.
- **page_size**: Quantidade de registros por página.

## Rotas

### Fornecedores

| Método | Rota                          | Descrição                             |
| :----: | ----------------------------- | ------------------------------------- |
|  GET   | `/fornecedores`               | Consultar os fornecedores criados     |
|  GET   | `/fornecedores/{id}`          | Consultar o fornecedor pelo ID        |
|  POST  | `/fornecedores`               | Criar um novo fornecedor              |
|  PUT   | `/fornecedores/{id}`          | Atualizar dados do fornecedor pelo ID |
|  POST  | `/fornecedores/{id}/contatos` | Criar novo contato para um fornecedor |
|  GET   | `/fornecedores/contatos/{id}` | Consultar contato pelo ID             |
|  PUT   | `/fornecedores/contatos/{id}` | Editar contato pelo ID                |
| DELETE | `/fornecedores/contatos/{id}` | Deletar uma pesagem pelo ID           |

---

#### GET /fornecedores

Opcionalmente, pode ser passado parâmetro `?search=<termo de busca>` para filtrar fornecedores pelo CPF, nome, CNPJ, razão social e nome fantasia. Os parâmetros de paginação são ignorados quando o parâmetro de busca é utilizado.

**Exemplo de Resposta:**

```json
[
  {
    "id": 28,
    "tipo": "PJ",
    "email": "exemplo@empresa.com",
    "telefone": "1234567890",
    "celular": "987654321",
    "cep": "12345678",
    "logradouro": "Rua Exemplo",
    "bairro": "Bairro Exemplo",
    "numero": "123",
    "complemento": "Comple",
    "estado": "SP",
    "cidade": "São Paulo",
    "ativo": true,
    "notas": "Notas do fornecedor",
    "pessoa": {
      "id_fornecedor": 28,
      "cnpj": "121156851955",
      "razao_social": "Empresa 123",
      "nome_fantasia": "Empresa Number"
    },
    "contatos": [
      {
        "id": 1,
        "id_fornecedor": 28,
        "nome": "Contato 1",
        "celular": "987654321",
        "cargo": "Cargo 1"
      },
      {
        "id": 2,
        "id_fornecedor": 28,
        "nome": "Contato 2",
        "celular": "987654322",
        "cargo": "Cargo 2"
      }
    ]
  },
  ...
]
```

---

#### GET /fornecedores/{id}

**Exemplo de Resposta:**

```json
{
  "id": 28,
  "tipo": "PJ",
  "email": "exemplo@empresa.com",
  "telefone": "1234567890",
  "celular": "987654321",
  "cep": "12345678",
  "logradouro": "Rua Exemplo",
  "bairro": "Bairro Exemplo",
  "numero": "123",
  "complemento": "Comple",
  "estado": "SP",
  "cidade": "São Paulo",
  "ativo": true,
  "notas": "Notas do fornecedor",
  "pessoa": {
    "id_fornecedor": 28,
    "cnpj": "121156851955",
    "razao_social": "Empresa 123",
    "nome_fantasia": "Empresa Number"
  },
  "contatos": [
    {
      "id": 1,
      "id_fornecedor": 28,
      "nome": "Contato 1",
      "celular": "987654321",
      "cargo": "Cargo 1"
    },
    {
      "id": 2,
      "id_fornecedor": 28,
      "nome": "Contato 2",
      "celular": "987654322",
      "cargo": "Cargo 2"
    }
  ]
}
```

---

#### POST /fornecedores

**Exemplo de Requisição:**

```json
[
  {
    "tipo": "PJ",
    "email": "exemplo@empresa.com",
    "telefone": "1234567890",
    "celular": "987654321",
    "cep": "12345678",
    "logradouro": "Rua Exemplo",
    "bairro": "Bairro Exemplo",
    "numero": "123",
    "complemento": "Comple",
    "estado": "SP",
    "cidade": "São Paulo",
    "ativo": true,
    "notas": "Notas do fornecedor",
    "pessoa": {
      "cnpj": "121156851955",
      "razao_social": "Empresa 123",
      "nome_fantasia": "Empresa Number"
    }
  },
  {
    "tipo": "PF",
    "email": "exemplo@gmail.com",
    "telefone": "1234567890",
    "celular": "987654321",
    "cep": "12345678",
    "logradouro": "Rua Exemplo",
    "bairro": "Bairro Exemplo",
    "numero": "123",
    "complemento": "Comple",
    "estado": "SP",
    "cidade": "São Paulo",
    "ativo": true,
    "notas": "Notas do fornecedor",
    "pessoa": {
      "cpf": "12304838483",
      "nome": "João Silva"
    }
  },
  ...
]
```

---

#### PUT /fornecedores/{id}

**Exemplo de Requisição:**

```json
{
  "notas": "Novas notas do fornecedor",
  "pessoa": {
    "nome_fantasia": "Novo nome fantasia"
  }
}
```

---

#### POST /fornecedores/{id}/contatos

**Exemplo de Requisição:**

```json
{
  "nome": "Contato 1",
  "celular": "987654321",
  "cargo": "Cargo 1"
}
```

---

#### GET /fornecedores/contatos/{id}

**Exemplo de Resposta:**

```json
{
  "id": 1,
  "id_fornecedor": 28,
  "nome": "Contato 1",
  "celular": "987654321",
  "cargo": "Cargo 1"
}
```

---

#### PUT /fornecedores/contatos/{id}

**Exemplo de Requisição:**

```json
{
  "nome": "Novo Nome"
}
```

---

### Compras

| Método | Rota                       | Descrição                               |
| :----: | -------------------------- | --------------------------------------- |
|  GET   | `/compras`                 | Consultar as compras criadas            |
|  GET   | `/compras/{id}`            | Consultar uma compra pelo ID            |
|  POST  | `/compras`                 | Criar uma nova compra                   |
|  PUT   | `/compras/{id}`            | Editar dados da compra pelo ID          |
|  POST  | `/compras/{id}/pagamentos` | Criar um novo pagamento para uma compra |
|  GET   | `/compras/pagamentos/{id}` | Consultar pagamento pelo ID             |
|  PUT   | `/compras/pagamentos/{id}` | Editar um pagamento pelo ID             |
| DELETE | `/compras/pagamentos/{id}` | Deletar um pagamento pelo ID            |
|  POST  | `/compras/{id}/pesagens`   | Criar nova pesagem para uma compra      |
|  GET   | `/compras/pesagens/{id}`   | Consultar pesagem pelo ID               |
|  PUT   | `/compras/pesagens/{id}`   | Editar pesagem pelo ID                  |
| DELETE | `/compras/pesagens/{id}`   | Deletar uma pesagem pelo ID             |

---

#### GET /compras

**Exemplo de Resposta:**

```json
[
  {
    "id": 1,
    "id_fornecedor": 1,
    "status": "CONCLUIDA",
    "unidades_macho": 10,
    "unidades_femea": 5,
    "preco_arroba": 150.5,
    "desconto": null,
    "animais_abatidos": 15,
    "peso_total_abate": null,
    "id_documento_romaneio": null,
    "id_documento_gta": null,
    "id_documento_nf_compra": null,
    "id_documento_nf_abate": null,
    "id_documento_nfs_matadouro": null,
    "id_documento_nf_retorno": null,
    "pagamentos": [
      {
        "id": 2,
        "id_compra": 1,
        "data": "2024-03-28",
        "meio_pagamento": "PIX",
        "valor": 8000,
        "id_documento_comprovante": null
      },
      {
        "id": 11,
        "id_compra": 1,
        "data": "2024-03-28",
        "meio_pagamento": "PIX",
        "valor": 777,
        "id_documento_comprovante": null
      }
    ],
    "pesagens": [
      {
        "id": 2,
        "id_compra": 1,
        "unidades": 10,
        "peso": 10.25,
        "criado_em": "2024-03-31T07:35:15.000Z"
      }
    ]
  },
  ...
]
```

---

#### GET /compras/{id}

**Exemplo de Resposta:**

```json
{
  "id": 3,
  "id_fornecedor": 1,
  "status": "CONCLUIDA",
  "unidades_macho": 10,
  "unidades_femea": 5,
  "preco_arroba": 150.5,
  "desconto": null,
  "animais_abatidos": 15,
  "peso_total_abate": 200.75,
  "id_documento_romaneio": null,
  "id_documento_gta": null,
  "id_documento_nf_compra": null,
  "id_documento_nf_abate": null,
  "id_documento_nfs_matadouro": null,
  "id_documento_nf_retorno": null,
  "pagamentos": [
    {
      "id": 3,
      "id_compra": 3,
      "data": "2024-03-28",
      "meio_pagamento": "PIX",
      "valor": 8001,
      "id_documento_comprovante": null
    },
    {
      "id": 4,
      "id_compra": 3,
      "data": "2024-03-28",
      "meio_pagamento": "PIX",
      "valor": 8000,
      "id_documento_comprovante": null
    }
  ],
  "compra_pesagems": [
    {
      "id": 2,
      "id_compra": 4,
      "unidades": 10,
      "peso": 10.25,
      "criado_em": "2024-03-31T07:35:15.000Z"
    }
  ]
}
```

---

#### POST /compras

**Exemplo de Requisição:**

```json
{
  "id_fornecedor": 1,
  "status": "CONCLUIDA",
  "unidades_macho": 10,
  "unidades_femea": 5,
  "preco_arroba": 10.5,
  "desconto": null,
  "animais_abatidos": 15,
  "peso_total_abate": 200.75,
  "id_documento_romaneio": null,
  "id_documento_gta": null,
  "id_documento_nf_compra": null,
  "id_documento_nf_abate": null,
  "id_documento_nfs_matadouro": null,
  "id_documento_nf_retorno": null
}
```

---

#### PUT /compras/{id}

**Exemplo de Requisição:**

```json
{
  "status": "CANCELADA",
  "unidadesMachos": 5
}
```

---

#### POST /compras/{id}/pagamentos

**Exemplo de Requisição:**

```json
{
  "data": "2024-03-28",
  "meio_pagamento": "PIX",
  "valor": 66666.0,
  "id_documento_comprovante": null
}
```

---

#### GET /compras/pagamentos/{id}

```json
{
  "id": 2,
  "id_compra": 4,
  "data": "2024-03-28",
  "meio_pagamento": "PIX",
  "valor": 8000,
  "id_documento_comprovante": null
}
```

---

#### PUT /compras/pagamentos/{id}

**Exemplo de Requisição:**

```json
{
  "valor": 10000
}
```

---

#### POST /compras/{id}/pesagens

**Exemplo de Requisição:**

```json
{
  "unidades": 777,
  "peso": 5000.25
}
```

---

#### GET /compras/pesagens/{id}

**Exemplo de Resposta:**

```json
{
  "id": 2,
  "id_compra": 4,
  "unidades": 10,
  "peso": 1300.25,
  "criado_em": "2024-03-31T07:35:15.000Z"
}
```

---

#### PUT /compras/pesagens/{id}

**Exemplo de Requisição:**

```json
{
  "unidades": 15
}
```

---

### Documentos

| Método | Rota                                 | Descrição                   |
| :----: | ------------------------------------ | --------------------------- |
|  POST  | `/documentos`                        | Criar novo documento        |
|  GET   | `/documentos/{id}`                   | Consultar documento pelo ID |
|  PUT   | `/documentos/{id}`                   | Editar documento pelo ID    |
| DELETE | `/documentos/{id}`                   | Deletar documento pelo ID   |
|  GET   | `/documentos/uploads/{nome_arquivo}` | Consultar arquivo pelo nome |

---

#### POST /documentos

Esta rota deve ser utilizada com o Content-Type `multipart/form-data`.

**Exemplo de Requisição:**

```js
const form = new FormData();
form.append("file", "/Users/luca/Desktop/test.png");
form.append("numero_referencia", "123");
form.append("descricao", "Documento de teste.");

fetch("http://localhost:3001/documentos", {
  method: "POST",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  body: form,
});
```

**Exemplo de Resposta:**

```json
{
  "id": 1,
  "numero_referencia": "123",
  "descricao": "Documento de teste.",
  "nome_arquivo": "documento-1.png"
}
```

---

#### GET /documentos/{id}

**Exemplo de Resposta:**

```json
{
  "id": 1,
  "numero_referencia": "123",
  "descricao": "Documento de teste.",
  "nome_arquivo": "documento-1.png"
}
```

---

#### PUT /documentos/{id}

**Exemplo de Requisição:**

```json
{
  "numero_referencia": "456",
  "descricao": "Nova descrição do documento."
}
```

---

### Usuários

| Método | Rota             | Descrição                 |
| :----: | ---------------- | ------------------------- |
|  POST  | `/usuarios`      | Criar novo usuairo        |
|  GET   | `/usuarios/{id}` | Consultar usuario pelo ID |
|  PUT   | `/usuarios/{id}` | Editar usuario pelo ID    |

#### POST /usuarios

**Exemplo de Requisição:**

```json
{
  "usuario": "joao_silva",
  "nome": "João da Silva",
  "email": "email@email.com",
  "cargo": "GERENTE",
  "senha": "12345"
}
```

#### GET /usuarios/{id}

**Exemplo de Resposta:**

```json
{
  "id": 1,
  "usuario": "joao_silva",
  "nome": "João da Silva",
  "email": "email@email.com",
  "cargo": "GERENTE",
  "senha": "12345"
}
```

#### PUT /usuarios/{id}

**Exemplo de Requisição:**

```json
{
    "usuario": "joao_silva_oliveira",
    ...
}
```
