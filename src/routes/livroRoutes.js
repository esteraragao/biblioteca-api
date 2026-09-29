const { Router } = require("express");
const LivroController = require("../controllers/LivroController");

const rotas = Router();

rotas.post("/", LivroController.criar);
rotas.get("/", LivroController.listar);
rotas.get("/:id", LivroController.buscarPorId);
rotas.put("/:id", LivroController.atualizar);
rotas.delete("/:id", LivroController.excluir);

rotas.post("/:livroId/categorias/:categoriaId", LivroController.associarCategoria);
rotas.delete("/:livroId/categorias/:categoriaId", LivroController.desassociarCategoria);

module.exports = rotas;