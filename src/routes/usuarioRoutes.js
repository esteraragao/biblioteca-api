const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const rotas = Router();

rotas.post("/", UsuarioController.criar);
rotas.get("/", UsuarioController.listar);
rotas.get("/:id", UsuarioController.buscarPorId);

module.exports = rotas;
