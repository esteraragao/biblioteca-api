const { Router } = require("express");
const EmprestimoController = require("../controllers/EmprestimoController");

const rotas = Router();

rotas.post("/", EmprestimoController.criar);
rotas.get("/", EmprestimoController.listar);
rotas.get("/:id", EmprestimoController.buscarPorId);
rotas.patch("/:id/devolucao", EmprestimoController.devolver);

module.exports = rotas;