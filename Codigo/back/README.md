# Back-end

## Rotas

| Método | Rota | Descrição |
| :------: | ---- | --------- |
| GET | `/fornecedores` | Consultar os fornecedores criados |
| GET | `/fornecedores/{id}` | Consultar o fornecedor pelo ID |
| POST | `/fornecedores` | Criar um novo fornecedor |
| PUT | `/fornecedores/{id}` | Atualizar dados do fornecedor pelo ID |

## Listar cursos

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