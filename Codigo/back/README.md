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
		"id": 11,
		"tipo": "PJ",
		"pessoa": {
			"cnpj": "123456995555",
			"razao_social": "Empresa sa",
			"nome_fantasia": "Empresa"
		},
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
		"notas": "Notas sobre o fornecedor 11"
	},
	{
		"id": 12,
		"tipo": "PF",
		"pessoa": {
			"cpf": "12345678901",
			"nome": "Maria De J"
		},
		"email": "contato12@exemplo.com",
		"telefone": "1234567801",
		"celular": "9876543201",
		"cep": "34567-890",
		"logradouro": "Rua Exemplo 12",
		"bairro": "Bairro Exemplo 12",
		"numero": "345",
		"complemento": "Sala 112",
		"estado": "RS",
		"cidade": "Porto Alegre",
		"ativo": true,
		"notas": "Notas sobre o fornecedor 12"
	}
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
		"pessoa": {
			"cnpj": "123456995555",
			"razao_social": "Empresa sa",
			"nome_fantasia": "Empresa"
		},
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
		"notas": "Notas sobre o fornecedor 11"
	},
    ...
    ,
	{
		"id": 15,
		"tipo": "PF",
		"pessoa": {
			"cpf": "12345677522",
			"nome": "Fornecedor 74852"
		},
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
		"notas": "Este é um fornecedor de exemplo"
	}
]
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
        "id": 2,
        "id_fornecedor": 1,
        "status": "CONCLUIDA",
        "unidades_macho": 10,
        "unidades_femea": 5,
        "preco_arroba": 137.77,
        "desconto": null,
        "animais_abatidos": 15,
        "peso_total_abate": 10500.75,
        "id_documento_romaneio": 1,
        "id_documento_gta": 2,
        "id_documento_nf_compra": 3,
        "id_documento_nf_abate": 4,
        "id_documento_nfs_matadouro": 5,
        "id_documento_nf_retorno": 6
    },
    {
        "id": 3,
        "id_fornecedor": 1,
        "status": "CONCLUIDA",
        "unidades_macho": 1,
        "unidades_femea": 2,
        "preco_arroba": 150.5,
        "desconto": null,
        "animais_abatidos": 3,
        "peso_total_abate": 2100.25,
        "id_documento_romaneio": 7,
        "id_documento_gta": 8,
        "id_documento_nf_compra": 9,
        "id_documento_nf_abate": 10,
        "id_documento_nfs_matadouro": null,
        "id_documento_nf_retorno": 11
    }
]
```
