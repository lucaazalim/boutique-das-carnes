# Documentação da API

## Paginação

As rotas de consulta de dados possuem suporte à parâmetros de paginação.

- **page**: Número da página a ser consultada.
- **page_size**: Quantidade de registros por página.

## Rotas

### Fornecedores

| Método | Rota                          | Descrição                             |
| :----: | ----------------------------- | ------------------------------------- |
|  POST  | `/fornecedores`               | Criar um novo fornecedor              |
|  GET   | `/fornecedores`               | Consultar os fornecedores criados     |
|  GET   | `/fornecedores/{id}`          | Consultar o fornecedor pelo ID        |
|  PUT   | `/fornecedores/{id}`          | Atualizar dados do fornecedor pelo ID |
| DELETE | `/fornecedores/{id}`          | Deletar fornecedor pelo ID            |
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
|  POST  | `/compras`                 | Criar uma nova compra                   |
|  GET   | `/compras`                 | Consultar as compras criadas            |
|  GET   | `/compras/{id}`            | Consultar uma compra pelo ID            |
|  PUT   | `/compras/{id}`            | Editar dados da compra pelo ID          |
| DELETE | `/compras/{id}`            | Deletar uma compra pelo ID              |
|  POST  | `/compras/{id}/pagamentos` | Criar um novo pagamento para uma compra |
|  GET   | `/compras/pagamentos/{id}` | Consultar pagamento pelo ID             |
|  PUT   | `/compras/pagamentos/{id}` | Editar um pagamento pelo ID             |
| DELETE | `/compras/pagamentos/{id}` | Deletar um pagamento pelo ID            |
|  POST  | `/compras/{id}/pesagens`   | Criar nova pesagem para uma compra      |
|  GET   | `/compras/pesagens/{id}`   | Consultar pesagem pelo ID               |
|  PUT   | `/compras/pesagens/{id}`   | Editar pesagem pelo ID                  |
| DELETE | `/compras/pesagens/{id}`   | Deletar uma pesagem pelo ID             |
|  POST  | `/compras/{id}/carcacas`   | Criar nova carcaça para uma compra      |
|  GET   | `/compras/carcacas/{id}`   | Consultar carcaça pelo ID               |
|  PUT   | `/compras/carcacas/{id}`   | Editar carcaça pelo ID                  |
| DELETE | `/compras/carcacas/{id}`   | Deletar uma carcaça pelo ID             |

---

#### POST /compras

**Exemplo de Requisição:**

```json
{
  "id_fornecedor": 1,
  "unidades_macho": 10,
  "unidades_femea": 5,
  "preco_arroba": 205.0,
  "preco_frete": 500.0,
  "preco_sangria": 20.0,
  "desconto": null,
  "id_documento_romaneio": null,
  "id_documento_gta": null,
  "id_documento_nf_compra": null,
  "id_documento_nf_abate": null,
  "id_documento_nfs_matadouro": null,
  "id_documento_nf_retorno": null
}
```

---

#### GET /compras

**Exemplo de Resposta:**

```json
[
  {
    "id": 1,
    "id_fornecedor": 1,
    "unidades_macho": 10,
    "unidades_femea": 5,
    "preco_arroba": 150.5,
    "preco_frete" : 500.00,
    "preco_sangria": 20.00,
    "desconto": null,
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
    ],
    "carcacas": [
      {
        "id": 1,
        "id_compra": 1,
        "sequencial": 1,
        "peso_total": 30.5,
        "criado_em": "2024-04-23T20:35:47.000Z"
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
  "unidades_macho": 10,
  "unidades_femea": 5,
  "preco_arroba": 150.5,
  "preco_frete": 500.0,
  "preco_sangria": 20.0,
  "desconto": null,
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
  "pesagems": [
    {
      "id": 2,
      "id_compra": 4,
      "unidades": 10,
      "peso": 10.25,
      "criado_em": "2024-03-31T07:35:15.000Z"
    }
  ],
  "carcacas": [
    {
      "id": 1,
      "id_compra": 2,
      "sequencial": 1,
      "peso_total": 30.5,
      "criado_em": "2024-04-23T20:35:47.000Z"
    }
  ]
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

#### POST /compras/{id}/carcacas

**Exemplo de Requisição:**

```json
{
  "sequencial": 10,
  "peso_total": 210.45
}
```

---

#### GET /compras/carcacas/{id}

**Exemplo de Resposta:**

```json
{
  "id": 1,
  "id_compra": 2,
  "sequencial": 1,
  "peso_total": 30.5,
  "criado_em": "2024-04-23T20:35:47.000Z"
}
```

---

#### PUT /compras/carcacas/{id}

**Exemplo de Requisição:**

```json
{
  "sequencial": 15,
  "peso_total": 300.53
}
```

---

### Clientes

| Método | Rota             | Descrição                          |
| :----: | ---------------- | ---------------------------------- |
|  POST  | `/clientes`      | Criar um novo cliente              |
|  GET   | `/clientes`      | Consultar os clientes criados      |
|  GET   | `/clientes/{id}` | Consultar o cliente pelo ID        |
|  PUT   | `/clientes/{id}` | Atualizar dados do cliente pelo ID |
| DELETE | `/clientes/{id}` | Deletar cliente pelo ID            |

---

#### POST /clientes

**Exemplo de Requisição:**

```json
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
}
```

---

#### GET /clientes

Opcionalmente, pode ser passado parâmetro `?search=<termo de busca>` para filtrar fornecedores pelo CPF, nome, CNPJ, razão social e nome fantasia. Os parâmetros de paginação são ignorados quando o parâmetro de busca é utilizado.

**Exemplo de Resposta:**

```json
[
  {
    "id": 2,
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
    "criado_em": "2024-05-02T20:45:17.000Z",
    "pessoa": {
      "cnpj": "121156851955",
      "razao_social": "Empresa 123",
      "nome_fantasia": "Empresa Number"
    }
  }
  ...
]
```

---

#### GET /clientes/{id}

**Exemplo de Resposta:**

```json
{
  "id": 2,
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
  "criado_em": "2024-05-02T20:45:17.000Z",
  "pessoa": {
    "cnpj": "121156851955",
    "razao_social": "Empresa 123",
    "nome_fantasia": "Empresa Number"
  }
}
```

---

#### PUT /clientes/{id}

**Exemplo de Requisiçãp:**

```json
{
  "email": "admin@boutiquedascarnes.com"
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

| Método | Rota             | Descrição                   |
| :----: | ---------------- | --------------------------- |
|  POST  | `/usuarios`      | Criar novo usuairo          |
|  GET   | `/usuarios`      | Consultar todos os usuarios |
|  GET   | `/usuarios/{id}` | Consultar usuario pelo ID   |
|  PUT   | `/usuarios/{id}` | Editar usuario pelo ID      |
| DELETE | `/usuarios/{id}` | Deletar usuario pelo ID     |

---

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

---

#### GET /usuarios

**Exemplo de Resposta:**

```json
{
  "id": 1,
  "usuario": "joao_silva",
  "nome": "João da Silva",
  "email": "email@email.com",
  "cargo": "GERENTE",
},
{
  "id": 2,
  "usuario": "maria_silva",
  "nome": "Maria da Silva",
  "email": "email@email.com",
  "cargo": "ADMINISTRADOR",
},
  ...
```

---

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

---

#### PUT /usuarios/{id}

**Exemplo de Requisição:**

```json
{
    "usuario": "joao_silva_oliveira",
    ...
}
```

---

### Login

| Método | Rota     | Descrição   |
| :----: | -------- | ----------- |
|  POST  | `/login` | Fazer login |

---

#### POST /login

**Exemplo de Requisição:**

```json
{
  "usuario": "joao_silva",
  "senha": "12345"
}
```

**Exemplo de Resposta:**

---

### Estoque

| Método | Rota               | Descrição                                                  |
| :----: | ------------------ | ---------------------------------------------------------- |
|  GET   | `/estoque`         | Consulta todos os produtos no estoque                      |
|  GET   | `/estoque/summary` | Consulta a quantidade de produtos no estoque por cada tipo |

---

#### GET /estoque

**Exemplo de Resposta:**

```js
[
  {
      "id": 1,
      "id_compra_carcaca": 12,
      "tipo": "FIGADO"
  },
  {
      "id": 2,
      "id_compra_carcaca": 12,
      "tipo": "DIANTEIRO_SEM_CUPIM"
  },
  ...
]
```

---

#### GET /estoque/summary

**Exemplo de Resposta:**

```js
[
  {
      "tipo": "FIGADO",
      "quantidade": 2
  },
  {
      "tipo": "DIANTEIRO_SEM_CUPIM",
      "quantidade": 2
  },
  ...
]
```

---

### Despesas

| Método | Rota             | Descrição                   |
| :----: | ---------------- | --------------------------- |
|  POST  | `/despesas`      | Criar nova despesa          |
|  GET   | `/despesas`      | Consultar todas as despesas |
|  GET   | `/despesas/{id}` | Consultar despesa pelo ID   |
|  PUT   | `/despesas/{id}` | Editar despesa pelo ID      |
| DELETE | `/despesas/{id}` | Deletar despesa pelo ID     |

---

#### POST /despesas

**Exemplo de Requisição:**

```js
{
  "nome": "Despesa X",
  "id_categoria": null,
  "id_documento_comprovante": null,
  "data": "2024-05-13",
  "valor": 100
}
```

---

#### GET /despesas

**Exemplo de Resposta:**

```js
[
  {
    "id": 3,
    "nome": "Despesa X",
    "id_categoria": null,
    "id_documento_comprovante": null,
    "data": "2024-05-13",
    "valor": 100
  },
    ...
]
```

---

#### GET /despesas/{id}

**Exemplo de Resposta:**

```js

{
  "id": 3,
  "nome": "Despesa X",
  "id_categoria": null,
  "id_documento_comprovante": null,
  "data": "2024-05-13",
  "valor": 100
}
```

---

#### PUT /despesas/{id}

**Exemplo de Requisição:**

```js

{
  "data": "2023-11-05",
}
```

---

### Despesas Categorias

| Método | Rota                        | Descrição                     |
| :----: | --------------------------- | ----------------------------- |
|  POST  | `/despesas-categorias`      | Criar nova categoria          |
|  GET   | `/despesas-categorias`      | Consultar todas as categorias |
|  GET   | `/despesas-categorias/{id}` | Consultar categorias pelo ID  |
|  PUT   | `/despesas-categorias/{id}` | Editar categorias pelo ID     |
| DELETE | `/despesas-categorias/{id}` | Deletar categorias pelo ID    |

---

#### POST /despesas-categorias

**Exemplo de Requisição:**

```js
{
  "nome": "salarial",
  "descricao": "folha assalarial dos funcionários",
  "cor":  "000000"
}
```

---

#### GET /despesas-categorias

**Exemplo de Resposta:**

```js
[
  {
    "id": 1,
    "nome": "Salarial",
    "descricao": "folha assalarial dos funcionários",
    "cor": "000000"
  },
  ...
]
```

---

#### GET /despesas-categorias/{id}

**Exemplo de Resposta:**

```js

{
  "id": 1,
  "nome": "Salarial",
  "descricao": "folha assalarial dos funcionários",
  "cor": "000000"
  },
}
```

---

#### PUT /despesas-categorias/{id}

**Exemplo de Requisição:**

```js

{
  "nome": "Nome exemplo",
}
```

### Pedidos

| Método | Rota            | Descrição                  |
| :----: | --------------- | -------------------------- |
|  POST  | `/pedidos`      | Criar novo pedido          |
|  GET   | `/pedidos`      | Consultar todos os pedidos |
|  GET   | `/pedidos/{id}` | Consultar pedido pelo ID   |
|  PUT   | `/pedidos/{id}` | Editar pedido pelo ID      |
| DELETE | `/pedidos/{id}` | Deletar pedido pelo ID     |

---

#### POST /pedidos

**Exemplo de Requisição:**

```js
{
  "id_cliente": 1,
  "id_compra": 2
}
```

---

#### GET /pedidos

**Exemplo de Resposta:**

```js
[
  {
    "id": 1,
    "id_cliente": 1,
    "id_compra": 2
  },
  ...
]
```

---

#### GET /pedidos/{id}

**Exemplo de Resposta:**

```js

{
  "id": 1,
  "id_cliente": 1,
  "id_compra": 2
}
```

---

#### PUT /pedidos/{id}

**Exemplo de Requisição:**

```js

{
    "id_cliente": 5
}
```

### Pedidos Itens

| Método | Rota                         | Descrição                                  |
| :----: | ---------------------------- | ------------------------------------------ |
|  POST  | `/pedidos/itens`             | Criar novo item                            |
|  GET   | `/pedidos/{id_pedido}/itens` | Consultar todos os itens pelo ID do pedido |
|  GET   | `/pedidos/itens/{id}`        | Consultar item pelo ID                     |
| DELETE | `/pedidos/itens/{id}`        | Deletar item pelo ID                       |

---

#### POST /pedidos/itens

**Exemplo de Requisição:**

```js
{
  "id_pedido": 4,
  "conjunto": "FATO",
  "letra": "A",
  "quantidade": 1,
  "peso": 175,
  "preco": 17.5
}
```

---

#### GET /pedidos/{id_pedido}/itens

**Exemplo de Resposta:**

```js
[
  {
    "id": 1,
    "id_pedido": 4,
    "conjunto": "COSTELA",
    "letra": "A",
    "quantidade": 1,
    "peso": 175,
    "preco": 17.5
  },
  ...
]
```

---

#### GET /pedidos/itens/{id}

**Exemplo de Resposta:**

```js

{
  "id": 1,
  "id_pedido": 4,
  "conjunto": "COSTELA",
  "letra": "A",
  "quantidade": 1,
  "peso": 175,
  "preco": 17.5
}
```

---
