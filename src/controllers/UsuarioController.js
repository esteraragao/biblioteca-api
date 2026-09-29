const servicoUsuario = require("../services/UsuarioService");
const AppError = require("../errors/AppError");

function obterId(valor) {
  const id = Number(valor);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("ID inválido", 400);
  }
  return id;
}

const UsuarioController = {
  async criar(req, res) {
    const usuario = await servicoUsuario.criar(req.body);
    res.status(201).json(usuario);
  },

  async listar(req, res) {
    const usuarios = await servicoUsuario.listar();
    res.json(usuarios);
  },

  async buscarPorId(req, res) {
    const usuario = await servicoUsuario.buscarPorId(obterId(req.params.id));
    res.json(usuario);
  },
};

module.exports = UsuarioController;
