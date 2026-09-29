# Biblioteca API

## Integrantes

- Integrante 1: Ester da Cruz Aragão
- Integrante 2: Yasmin Rodrigues da Silva

## Sobre o projeto

A **Biblioteca API** é uma aplicação REST desenvolvida para a atividade prática de Desenvolvimento Web 2.

O projeto foi desenvolvido utilizando **Node.js, Express, Sequelize e SQLite**, com o objetivo de criar uma API para gerenciamento de autores, livros e categorias. Como extensão da atividade, também foram implementados os recursos relacionados a usuários e empréstimos de livros.

A aplicação foi organizada em camadas de **Controllers, Services, Repositories e Models**, buscando manter uma separação clara das responsabilidades de cada parte do sistema.

## Tecnologias utilizadas

* Node.js
* Express
* Sequelize
* SQLite

## Instalação

Para instalar as dependências do projeto, abra o terminal na pasta principal da aplicação e execute:

```bash
npm install
```

## Execução

Para iniciar o servidor:

```bash
npm start
```

A API será executada, por padrão, na porta:

```text
http://localhost:3000
```

Durante o desenvolvimento, também é possível utilizar:

```bash
npm run dev
```

O banco de dados utilizado pela aplicação é o SQLite, armazenado em:

```text
database/biblioteca.sqlite
```

## Organização da aplicação

O projeto segue uma organização em camadas:

```text
Controller → Service → Repository → Model/Sequelize → SQLite
```

* **Controllers:** recebem as requisições HTTP e encaminham as operações para os Services.
* **Services:** concentram as regras de negócio da aplicação.
* **Repositories:** realizam o acesso e as operações sobre os dados utilizando Sequelize.
* **Models:** representam as entidades e suas configurações no banco de dados.
* **SQLite:** responsável pelo armazenamento dos dados.

## Rotas da API

### Autores

| Método | Rota           | Função             |
| ------ | -------------- | ------------------ |
| POST   | `/autores`     | Cadastrar autor    |
| GET    | `/autores`     | Listar autores     |
| GET    | `/autores/:id` | Consultar um autor |
| PUT    | `/autores/:id` | Alterar autor      |
| DELETE | `/autores/:id` | Excluir autor      |

### Livros

| Método | Rota                                       | Função                      |
| ------ | ------------------------------------------ | --------------------------- |
| POST   | `/livros`                                  | Cadastrar livro             |
| GET    | `/livros`                                  | Listar livros               |
| GET    | `/livros/:id`                              | Consultar um livro          |
| PUT    | `/livros/:id`                              | Alterar livro               |
| DELETE | `/livros/:id`                              | Excluir livro               |
| POST   | `/livros/:livroId/categorias/:categoriaId` | Associar categoria ao livro |
| DELETE | `/livros/:livroId/categorias/:categoriaId` | Remover categoria do livro  |

### Categorias

| Método | Rota              | Função                  |
| ------ | ----------------- | ----------------------- |
| POST   | `/categorias`     | Cadastrar categoria     |
| GET    | `/categorias`     | Listar categorias       |
| GET    | `/categorias/:id` | Consultar uma categoria |
| PUT    | `/categorias/:id` | Alterar categoria       |
| DELETE | `/categorias/:id` | Excluir categoria       |

### Usuários

Os recursos de usuários fazem parte da implementação do desafio extra relacionado aos empréstimos.

| Método | Rota            | Função               |
| ------ | --------------- | -------------------- |
| POST   | `/usuarios`     | Cadastrar usuário    |
| GET    | `/usuarios`     | Listar usuários      |
| GET    | `/usuarios/:id` | Consultar um usuário |

### Empréstimos

| Método | Rota                         | Função                  |
| ------ | ---------------------------- | ----------------------- |
| POST   | `/emprestimos`               | Registrar empréstimo    |
| GET    | `/emprestimos`               | Listar empréstimos      |
| GET    | `/emprestimos/:id`           | Consultar um empréstimo |
| PATCH  | `/emprestimos/:id/devolucao` | Registrar devolução     |

## Exemplos de cadastro

### Autor

```json
{
  "nome": "Machado de Assis",
  "email": "machado@example.com",
  "nacionalidade": "Brasileira"
}
```

### Livro

```json
{
  "titulo": "Dom Casmurro",
  "isbn": "9780000000000",
  "ano": 1899,
  "disponivel": true,
  "autorId": 1
}
```

### Categoria

```json
{
  "nome": "Romance",
  "descricao": "Obras do gênero romance."
}
```

## Filtros e paginação

A rota `GET /livros` permite realizar consultas utilizando diferentes filtros.

### Filtro por título

```text
GET /livros?titulo=dom
```

### Filtro por ano

```text
GET /livros?ano=1899
```

### Filtro por disponibilidade

```text
GET /livros?disponivel=true
```

Os filtros podem ser utilizados simultaneamente:

```text
GET /livros?titulo=dom&disponivel=true
```

Também é possível utilizar paginação:

```text
GET /livros?page=1&limit=10
```

Quando a paginação é utilizada, a resposta apresenta os dados em `data` e as informações da paginação em `pagination`, incluindo:

* `page`: página atual;
* `limit`: quantidade de registros por página;
* `total`: quantidade total de registros;
* `totalPages`: quantidade total de páginas.

A consulta de livros também utiliza o relacionamento com `Autor` por meio do `include` do Sequelize, permitindo que os dados do autor relacionado sejam retornados junto aos livros.

## Relacionamentos

A aplicação possui os seguintes relacionamentos:

* Um **Autor** pode possuir vários **Livros**.
* Um **Livro** pertence a um **Autor**.
* Um **Livro** pode possuir várias **Categorias**.
* Uma **Categoria** pode estar associada a vários **Livros**.
* Um **Usuário** pode possuir vários **Empréstimos**.
* Um **Livro** pode possuir vários registros de **Empréstimo** ao longo do tempo.

A relação entre **Livros** e **Categorias** é do tipo muitos-para-muitos e utiliza a tabela intermediária:

```text
livro_categorias
```

## Validações e tratamento de erros

Os campos obrigatórios são definidos e validados nos Models utilizando os recursos do Sequelize.

Também são aplicadas restrições de unicidade para os campos que precisam ser únicos, como:

* e-mail dos autores;
* e-mail dos usuários;
* ISBN dos livros;
* nome das categorias.

O projeto também realiza verificações relacionadas a:

* IDs inválidos;
* registros inexistentes;
* campos obrigatórios;
* valores duplicados;
* relacionamentos entre entidades;
* disponibilidade dos livros para empréstimo.

Os erros são tratados na aplicação e convertidos em respostas HTTP adequadas. O tratamento de erros é realizado diretamente no `app.js`, não sendo necessária uma pasta separada de `middlewares`.

## Empréstimos de livros

O sistema de empréstimos foi desenvolvido como parte do desafio extra apresentado no roteiro da atividade.

Para realizar um empréstimo, o sistema verifica:

1. se o usuário informado existe;
2. se o livro informado existe;
3. se o livro está disponível para empréstimo.

Quando o empréstimo é realizado, duas operações acontecem dentro da mesma transação:

* criação do registro de empréstimo;
* alteração do campo `disponivel` do livro para `false`.

Dessa forma, caso alguma das operações apresente erro, a transação é desfeita.

Na devolução do livro:

* o status do empréstimo passa para `devolvido`;
* a data de devolução é registrada;
* o livro volta a ficar disponível.

## Estrutura do projeto

```text
biblioteca-api/
├── database/
│   └── biblioteca.sqlite
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── AutorController.js
│   │   ├── CategoriaController.js
│   │   ├── EmprestimoController.js
│   │   ├── LivroController.js
│   │   └── UsuarioController.js
│   │
│   ├── errors/
│   │   └── AppError.js
│   │
│   ├── models/
│   │   ├── Autor.js
│   │   ├── Categoria.js
│   │   ├── Emprestimo.js
│   │   ├── Livro.js
│   │   ├── Usuario.js
│   │   └── index.js
│   │
│   ├── repositories/
│   │   ├── AutorRepository.js
│   │   ├── BaseRepository.js
│   │   ├── CategoriaRepository.js
│   │   ├── EmprestimoRepository.js
│   │   ├── LivroRepository.js
│   │   └── UsuarioRepository.js
│   │
│   ├── routes/
│   │   ├── autorRoutes.js
│   │   ├── categoriaRoutes.js
│   │   ├── emprestimoRoutes.js
│   │   ├── livroRoutes.js
│   │   └── usuarioRoutes.js
│   │
│   ├── services/
│   │   ├── AutorService.js
│   │   ├── CategoriaService.js
│   │   ├── EmprestimoService.js
│   │   ├── LivroService.js
│   │   └── UsuarioService.js
│   │
│   └── app.js
│
├── package.json
└── README.md
```

## Desafio extra

Os módulos `Usuario` e `Emprestimo` correspondem ao desafio extra apresentado no roteiro da atividade.

A implementação inclui o cadastro e consulta de usuários, além do registro e devolução de empréstimos, com atualização da disponibilidade dos livros e utilização de transações para manter a consistência dos dados.

## Considerações finais

A aplicação reúne as funcionalidades propostas no roteiro da atividade, incluindo operações CRUD, validações, relacionamentos entre entidades, consultas com filtros, paginação, tratamento de erros e a implementação do desafio extra de empréstimos.

O projeto foi estruturado em camadas para separar as responsabilidades e facilitar a organização e manutenção do código.
