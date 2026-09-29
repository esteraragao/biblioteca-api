const express = require("express");
const { sequelize } = require("./models");
const AppError = require("./errors/AppError");

const autorRoutes = require("./routes/autorRoutes");
const livroRoutes = require("./routes/livroRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const emprestimoRoutes = require("./routes/emprestimoRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API da Biblioteca no ar" });
});

app.use("/autores", autorRoutes);
app.use("/livros", livroRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/emprestimos", emprestimoRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

// Tratamento centralizado dos erros, sem uma pasta de middlewares.
app.use((erro, req, res, next) => {
  if (res.headersSent) return next(erro);

  if (erro instanceof AppError) {
    return res.status(erro.statusCode).json({ erro: erro.message });
  }

  if (erro.type === "entity.parse.failed") {
    return res.status(400).json({ erro: "JSON inválido no corpo da requisição" });
  }

  if (erro.name === "SequelizeUniqueConstraintError") {
    const campos = erro.errors.map((item) => item.path).filter(Boolean);
    return res.status(409).json({
      erro: "Já existe um registro com esse valor",
      campos,
    });
  }

  if (erro.name === "SequelizeValidationError") {
    const detalhes = erro.errors.map((item) => ({
      campo: item.path,
      mensagem: item.message,
    }));
    return res.status(400).json({ erro: "Erro de validação", detalhes });
  }

  if (erro.name === "SequelizeForeignKeyConstraintError") {
    return res.status(409).json({
      erro: "Operação não permitida porque o registro possui vínculos com outros dados",
    });
  }

  console.error(erro);
  return res.status(500).json({ erro: "Erro interno do servidor" });
});

async function iniciar() {
  const porta = process.env.PORT || 3000;

  try {
    await sequelize.authenticate();
    console.log("Conexão com o SQLite estabelecida.");

    await sequelize.sync();
    console.log("Tabelas sincronizadas.");

    app.listen(porta, () => {
      console.log(`Servidor rodando em http://localhost:${porta}`);
    });
  } catch (erro) {
    console.error("Não foi possível iniciar a aplicação:", erro);
    process.exit(1);
  }
}

if (require.main === module) iniciar();

module.exports = app;
