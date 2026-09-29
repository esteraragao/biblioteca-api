const servicoEmprestimo = require("../services/EmprestimoService");
const AppError = require("../errors/AppError");

function obterId(valor) {
  const id = Number(valor);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("ID inválido", 400);
  }
  return id;
}

const EmprestimoController = {
  async criar(req, res) {
    const emprestimo = await servicoEmprestimo.emprestar(req.body);
    res.status(201).json(emprestimo);
  },

  async listar(req, res) {
    const emprestimos = await servicoEmprestimo.listar();
    res.json(emprestimos);
  },

  async buscarPorId(req, res) {
    const emprestimo = await servicoEmprestimo.buscarPorId(obterId(req.params.id));
    res.json(emprestimo);
  },

  async devolver(req, res) {
    const emprestimo = await servicoEmprestimo.devolver(obterId(req.params.id));
    res.json(emprestimo);
  },
};

module.exports = EmprestimoController;
