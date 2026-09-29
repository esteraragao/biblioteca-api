const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");

const DIRETORIO_DADOS = path.resolve(__dirname, "../../database");
const ARQUIVO_SQLITE = path.resolve(DIRETORIO_DADOS, "biblioteca.sqlite");

if (!fs.existsSync(DIRETORIO_DADOS)) {
  fs.mkdirSync(DIRETORIO_DADOS, { recursive: true });
}

const conexao = new Sequelize({
  dialect: "sqlite",
  storage: ARQUIVO_SQLITE,
  logging: false,
});

module.exports = conexao;