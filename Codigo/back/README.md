# Back-end

## Rotas

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
        "id": 1,
        "tipo": "PJ",
        "email": "fornecedor1@exemplo.com",
        "telefone": null,
        "celular": null,
        "cep": "12345678",
        "logradouro": "Rua Exemplo, 123",
        "bairro": "Centro",
        "numero": null,
        "complemento": null,
        "estado": "SP",
        "cidade": "São Paulo",
        "ativo": true,
        "notas": null
    },
    ...
]
```

**Rota:** /fornecedores?page=2&pageSize=5

**Método:** GET

**Formato:**

```json
[
    [
	{
		"id": 6,
		"tipo": "PJ",
		"email": "contato1@exemplo.com",
		"telefone": "1234567890",
		"celular": "9876543210",
		"cep": "12345-678",
		"logradouro": "Rua Exemplo 1",
		"bairro": "Bairro Exemplo 1",
		"numero": "123",
		"complemento": "Sala 101",
		"estado": "SP",
		"cidade": "São Paulo",
		"ativo": true,
		"notas": "Notas sobre o fornecedor 1"
	},
    ...
    ,
	{
		"id": 10,
		"tipo": "PJ",
		"email": "contato5@exemplo.com",
		"telefone": "1234567894",
		"celular": "9876543214",
		"cep": "56789-012",
		"logradouro": "Rua Exemplo 5",
		"bairro": "Bairro Exemplo 5",
		"numero": "567",
		"complemento": "Sala 105",
		"estado": "BA",
		"cidade": "Salvador",
		"ativo": false,
		"notas": "Notas sobre o fornecedor 5"
	}
]
```