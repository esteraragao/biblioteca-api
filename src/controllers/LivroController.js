const servicoLivro = require("../services/LivroService");
const AppError = require("../errors/AppError");

function obterId(valor, nome = "ID") {
  const id = Number(valor);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError(`${nome} inválido`, 400);
  }
  return id;
}

const LivroController = {
  async criar(req, res) {
    const livro = await servicoLivro.criar(req.body);
    res.status(201).json(livro);
  },

  async listar(req, res) {
    const livros = await servicoLivro.listar(req.query);
    res.json(livros);
  },

  async buscarPorId(req, res) {
    const livro = await servicoLivro.buscarPorId(obterId(req.params.id));
    res.json(livro);
  },

  async atualizar(req, res) {
    const livro = await servicoLivro.atualizar(obterId(req.params.id), req.body);
    res.json(livro);
  },

  async excluir(req, res) {
    await servicoLivro.excluir(obterId(req.params.id));
    res.status(204).send();
  },

  async associarCategoria(req, res) {
    const livroId = obterId(req.params.livroId, "livroId");
    const categoriaId = obterId(req.params.categoriaId, "categoriaId");
    const resultado = await servicoLivro.associarCategoria(livroId, categoriaId);
    res.status(201).json(resultado);
  },

  async desassociarCategoria(req, res) {
    const livroId = obterId(req.params.livroId, "livroId");
    const categoriaId = obterId(req.params.categoriaId, "categoriaId");
    const resultado = await servicoLivro.desassociarCategoria(livroId, categoriaId);
    res.json(resultado);
  },
};

module.exports = LivroController;
