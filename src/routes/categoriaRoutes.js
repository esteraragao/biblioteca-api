const { Router } = require("express");
const CategoriaController = require("../controllers/CategoriaController");

const rotas = Router();

rotas.post("/", CategoriaController.criar);
rotas.get("/", CategoriaController.listar);
rotas.get("/:id", CategoriaController.buscarPorId);
rotas.put("/:id", CategoriaController.atualizar);
rotas.delete("/:id", CategoriaController.excluir);

module.exports = rotas;