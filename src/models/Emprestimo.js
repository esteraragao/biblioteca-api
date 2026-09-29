const { DataTypes } = require("sequelize");
const conexao = require("../config/database");

const colunas = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  livroId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dataEmprestimo: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  dataDevolucao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("ativo", "devolvido"),
    allowNull: false,
    defaultValue: "ativo",
  },
};

const Emprestimo = conexao.define("Emprestimo", colunas, { tableName: "emprestimos" });

module.exports = Emprestimo;