# Back-end

## Rotas Fornecedores

| Método | Rota | Descrição |
| :------: | ---- | --------- |
| GET | `/fornecedores` | Consultar os fornecedores criados |
| GET | `/fornecedores/{id}` | Consultar o fornecedor pelo ID |
| POST | `/fornecedores` | Criar um novo fornecedor |
| PUT | `/fornecedores/{id}` | Atualizar dados do fornecedor pelo ID |

## Listar Fornecedores

**Rota:** /fornecedores

**Método:** GET

**Formato:**

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
		"contato": [
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

**Rota:** /fornecedores?page=3&page_size=5

**Método:** GET

**Formato:**

```json
[
    [
	{
		"id": 11,
		"tipo": "PJ",
		"email": "contato11@exemplo.com",
		"telefone": "1234567800",
		"celular": "9876543200",
		"cep": "23456-789",
		"logradouro": "Rua Exemplo 11",
		"bairro": "Bairro Exemplo 11",
		"numero": "234",
		"complemento": "Sala 111",
		"estado": "RJ",
		"cidade": "Rio de Janeiro",
		"ativo": true,
		"notas": "Notas sobre o fornecedor 11",
		"pessoa": {
			"id_fornecedor": 11,
			"cnpj": "123456995555",
			"razao_social": "Empresa sa",
			"nome_fantasia": "Empresa"
		},
		"contato": []
	},
    ...
    ,
	{
		"id": 15,
		"tipo": "PF",
		"email": "contato9995145@exemplo.com",
		"telefone": "0012345678",
		"celular": "00987654321",
		"cep": "12345678",
		"logradouro": "Rua Exemplo",
		"bairro": "Bairro Exemplo",
		"numero": "123",
		"complemento": "Sala 101",
		"estado": "SE",
		"cidade": "Aracaju",
		"ativo": true,
		"notas": "Este é um fornecedor de exemplo",
		"pessoa": {
			"id_fornecedor": 15,
			"cpf": "12345677522",
			"nome": "Fornecedor 74852"
		},
		"contato": []
	}
]
```

## Rotas Fornecedores - Contatos

| Método | Rota | Descrição |
| :------: | ---- | --------- |
| GET | `/fornecedores/contatos` | Consultar os contatos dos fornecedores criados |
| GET | `/fornecedores/{idFornecedor}/contatos/{id}` | Consultar o contato do fornecedor pelo ID |
| POST | `/fornecedores/{idFornecedor}/contatos/{id}` | Criar um novo contato com o ID do fornecedor |
| PUT | `/fornecedores/{idFornecedor}/contatos/{id}` | Atualizar dados do contaot com ID do fornecedor |

## Listar Fornecedores

**Rota:** /fornecedores/contatos

**Método:** GET

**Formato:**

```json
[
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
	},
	...
]
```

**Rota:** /fornecedores/{idFornecedor}/contatos/{id}

**Método:** POST

**Formato:**

```json
[
	{
	"contato": [
			{
				"nome": "Contato 1",
				"celular": "987654321",
				"cargo": "Cargo 1"
			},
			{
				"nome": "Contato 2",
				"celular": "987654322",
				"cargo": "Cargo 2"
			}
		]
	}
]
```

**Rota:** /fornecedores/{idFornecedor}/contatos/{id}

**Método:** PUT

**Formato:**

```json
{
	"nome": "Novo Nome"
}
```

**Rota:** /fornecedores/{idFornecedor}/contatos/{id}

**Método:** DELETE

**Formato:**

```json

```

## Rotas Compras

| Método | Rota | Descrição |
| :------: | ---- | --------- |
| GET | `/compras` | Consultar as compras criadas |
| GET | `/compras/{id}` | Consultar uma compra pelo ID |
| POST | `/compras` | Criar uma nova compra |
| PUT | `/compras/{id}` | Atualizar dados da compra pelo ID |

## Listar Compras

**Rota:** /compras

**Método:** GET

**Formato:**

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
        "compra_pagamentos": [
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
	"compra_pesagems": [
            {
                "id": 2,
                "id_compra": 1,
                "unidades": 10,
                "peso": 10.25,
                "criado_em": "2024-03-31T07:35:15.000Z"
            }
        ]
    }
]
```
**Rota:** /compras/{idCompra}

**Método:** GET

**Formato:**

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
    "compra_pagamentos": [
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
**Rota:** /compras

**Método:** POST

**Formato:**

```json
{
    "idFornecedor": 1,
    "status": "CONCLUIDA",
    "unidadesMachos": 10,
    "unidadeFemea": 5,
    "precoArroba": 130.50,
    "desconto": null,
    "animaisAbatidos": 15,
    "pesoTotalAbate": 200.75,
    "idDocumentoRomaneio": null,
    "idDocumentoGta": null,
    "idDocumentoNFCompra": null,
    "idDocumentoNFAbate": null,
    "idDocumentoNFsMatadouro": null,
    "idDocumentoNFRetorno": null
}
```

## Rotas Pagamentos

| Método | Rota | Descrição |
| :------: | ---- | --------- |
| GET | `/compras/pagamentos` | Consultar os pagamentos criados |
| GET | `/compras/pagamentos/{id}` | Consultar um pagamento pelo ID |
| POST | `/compras/pagamento` | Criar um novo pagamento |
| PUT | `/compras/pagamento/{id}` | Atualizar dados de um pagamento pelo ID |

## Listar Pagamentos

**Rota:** /compras/pagamentos

**Método:** GET

**Formato:**

```json
[
    {
        "id": 2,
        "id_compra": 4,
        "data": "2024-03-28",
        "meio_pagamento": "PIX",
        "valor": 8000,
        "id_documento_comprovante": null
    }
]
```


**Rota:** /compras/pagamentos/{idPagamentos}

**Método:** GET

**Formato:**

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

**Rota:** /compras/pagamentos

**Método:** POST

**Formato:**

```json

{
    "id_compra": 4,
    "data": "2024-03-28",
    "meio_pagamento": "PIX",
    "valor": 1000.00,
    "id_documento_comprovante": null
}

```

## Rotas Pesagens

| Método | Rota | Descrição |
| :------: | ---- | --------- |
| GET | `/compras/pesagens` | Consultar as pesagens criadas |
| GET | `/compras/pesagens/{id}` | Consultar uma pesagem pelo ID |
| POST | `/compras/pesagens` | Criar uma nova pesagem |
| PUT | `/compras/pesagens/{id}` | Atualizar dados de uma pesagem pelo ID |

## Listar Pagamentos

**Rota:** /compras/pesagens

**Método:** GET

**Formato:**

```json

[
    {
        "id": 2,
        "id_compra": 4,
        "unidades": 10,
        "peso": 1300.25,
        "criado_em": "2024-03-31T07:35:15.000Z"
    }
]

```



**Rota:** /compras/pesagens/{idPesagem}

**Método:** GET

**Formato:**

```json


{
        "id": 2,
        "id_compra": 4,
        "unidades": 10,
        "peso": 1200.25,
        "criado_em": "2024-03-31T07:35:15.000Z"
}
```

**Rota:** /compras/pesagens/

**Método:** POST

**Formato:**

```json


{
    "id_compra": 10,
    "unidades": 5,
    "peso": 1300
}

```


