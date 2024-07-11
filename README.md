# Boutique das Carnes

A **Boutique das Carnes** é uma empresa de compra e venda de produtos alimentícios, que opera na cidade de Ilhéus, na Bahia. A operação ocorre por meio da compra de gado vivo em fazendas, encaminhamento do gado ao matadouro, transformação do produto em carcaça e venda aos clientes, que geralmente são açougues da região.

Este software tem como objetivo auxiliar a empresa a gerenciar suas atividades, substituindo o sistema de controle por planilhas, que tem se mostrado cada vez mais inadequado e limitado para acompanhar o crescimento e a complexidade da operação.

## Alunos integrantes da equipe

- Fernando Antônio Ferreira Ibrahim ([@FernandoIbrahim](https://github.com/FernandoIbrahim))
- Jhonata Silveira Dias ([@jhonatasdias](https://github.com/jhonatasdias))
- Luca Ferrari Azalim ([@lucaazalim](https://github.com/lucaazalim))
- Rafael Moreira Barbosa Baptista ([@RafaMtF](https://github.com/RafaMtF))

## Professores responsáveis

- Eveline Alonso Veloso
- Juliana Amaral Baroni de Carvalho

## Instruções de utilização

As seguintes dependências são necessárias para executar este software:

- Node Package Manager (NPM)
- Docker e Docker Compose

Os seguintes passos devem ser seguidos para executar os components do software em ambiente de desenvolvimento:

- Clonar o repositório;
- Navegar até o diretório `/Codigo/back` e executar as seguintes ações:
  - Criar um arquivo `.env` seguindo o `.env.example`, que define as configurações do ambiente;
  - Executar o comando `npm install`, que instala as dependências do projeto.
- Navegar até o diretório `/Codigo/front` e executar as seguintes ações:
  - Executar o comando `npm install`, que instala as dependências do projeto;
  - Executar o comando `npm run dev`, que inicia a aplicação do front.
- Navegar até o diretório `/Codigo` e executar o comando `docker-compose up back --build`, que inicia o banco de dados e a aplicação do back.
