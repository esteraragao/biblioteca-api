const servicoCategoria = require("../services/CategoriaService");
const AppError = require("../errors/AppError");

function obterId(valor) {
  const id = Number(valor);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("ID inválido", 400);
  }
  return id;
}

const CategoriaController = {
  async criar(req, res) {
    const categoria = await servicoCategoria.criar(req.body);
    res.status(201).json(categoria);
  },

  async listar(req, res) {
    const categorias = await servicoCategoria.listar();
    res.json(categorias);
  },

  async buscarPorId(req, res) {
    const categoria = await servicoCategoria.buscarPorId(obterId(req.params.id));
    res.json(categoria);
  },

  async atualizar(req, res) {
    const categoria = await servicoCategoria.atualizar(obterId(req.params.id), req.body);
    res.json(categoria);
  },

  async excluir(req, res) {
    await servicoCategoria.excluir(obterId(req.params.id));
    res.status(204).send();
  },
};

module.exports = CategoriaController;
