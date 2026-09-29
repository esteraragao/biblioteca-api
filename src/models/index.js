const conexao = require("../config/database");
const Autor = require("./Autor");
const Livro = require("./Livro");
const Categoria = require("./Categoria");
const Usuario = require("./Usuario");
const Emprestimo = require("./Emprestimo");

// Autor 1:N Livro
Autor.hasMany(Livro, { foreignKey: "autorId", onDelete: "RESTRICT" });
Livro.belongsTo(Autor, { foreignKey: "autorId" });

// Livro N:N Categoria
Livro.belongsToMany(Categoria, {
  through: "livro_categorias",
  foreignKey: "livroId",
  otherKey: "categoriaId",
  as: "categorias",
});
Categoria.belongsToMany(Livro, {
  through: "livro_categorias",
  foreignKey: "categoriaId",
  otherKey: "livroId",
  as: "livros",
});

// Usuario 1:N Emprestimo
Usuario.hasMany(Emprestimo, { foreignKey: "usuarioId", onDelete: "RESTRICT" });
Emprestimo.belongsTo(Usuario, { foreignKey: "usuarioId" });

// Livro 1:N Emprestimo
Livro.hasMany(Emprestimo, { foreignKey: "livroId", onDelete: "RESTRICT" });
Emprestimo.belongsTo(Livro, { foreignKey: "livroId" });

module.exports = {
  sequelize: conexao,
  Autor,
  Livro,
  Categoria,
  Usuario,
  Emprestimo,
};