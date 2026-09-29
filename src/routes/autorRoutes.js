const { Router } = require("express");
const AutorController = require("../controllers/AutorController");

const rotas = Router();

rotas.post("/", AutorController.criar);
rotas.get("/", AutorController.listar);
rotas.get("/:id", AutorController.buscarPorId);
rotas.put("/:id", AutorController.atualizar);
rotas.delete("/:id", AutorController.excluir);

module.exports = rotas;