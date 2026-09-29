const servicoAutor = require("../services/AutorService");
const AppError = require("../errors/AppError");

function obterId(valor) {
  const id = Number(valor);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("ID inválido", 400);
  }
  return id;
}

const AutorController = {
  async criar(req, res) {
    const autor = await servicoAutor.criar(req.body);
    res.status(201).json(autor);
  },

  async listar(req, res) {
    const autores = await servicoAutor.listar();
    res.json(autores);
  },

  async buscarPorId(req, res) {
    const autor = await servicoAutor.buscarPorId(obterId(req.params.id));
    res.json(autor);
  },

  async atualizar(req, res) {
    const autor = await servicoAutor.atualizar(obterId(req.params.id), req.body);
    res.json(autor);
  },

  async excluir(req, res) {
    await servicoAutor.excluir(obterId(req.params.id));
    res.status(204).send();
  },
};

module.exports = AutorController;
