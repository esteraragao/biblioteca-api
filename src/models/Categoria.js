const { DataTypes } = require("sequelize");
const conexao = require("../config/database");

const colunas = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: { msg: "O nome da categoria é obrigatório" },
      notEmpty: { msg: "O nome da categoria não pode ser vazio" },
    },
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
};

const Categoria = conexao.define("Categoria", colunas, { tableName: "categorias" });

module.exports = Categoria;