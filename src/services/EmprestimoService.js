const { sequelize } = require("../models");
const EmprestimoRepository = require("../repositories/EmprestimoRepository");
const LivroRepository = require("../repositories/LivroRepository");
const UsuarioRepository = require("../repositories/UsuarioRepository");
const AppError = require("../errors/AppError");

class EmprestimoService {
  listar() {
    return EmprestimoRepository.listar();
  }

  async buscarPorId(id) {
    const emprestimo = await EmprestimoRepository.buscarPorId(id);
    if (!emprestimo) throw new AppError("Empréstimo não encontrado", 404);
    return emprestimo;
  }

  async emprestar(dados = {}) {
    const { usuarioId, livroId } = dados;

    if (!usuarioId || !livroId) {
      throw new AppError("usuarioId e livroId são obrigatórios", 400);
    }

    const idEmprestimo = await sequelize.transaction(async (transaction) => {
      const usuario = await UsuarioRepository.buscarPorId(usuarioId, { transaction });
      if (!usuario) throw new AppError("Usuário não encontrado", 404);

      const livro = await LivroRepository.buscarPorId(livroId, {
        include: [],
        transaction,
      });
      if (!livro) throw new AppError("Livro não encontrado", 404);
      if (!livro.disponivel) throw new AppError("Livro indisponível para empréstimo", 409);

      const emprestimo = await EmprestimoRepository.criar(
        {
          usuarioId,
          livroId,
          dataEmprestimo: new Date(),
          status: "ativo",
        },
        { transaction }
      );

      await livro.update({ disponivel: false }, { transaction });
      return emprestimo.id;
    });

    return this.buscarPorId(idEmprestimo);
  }

  async devolver(id) {
    await sequelize.transaction(async (transaction) => {
      const emprestimo = await EmprestimoRepository.buscarPorId(id, {
        include: [],
        transaction,
      });

      if (!emprestimo) throw new AppError("Empréstimo não encontrado", 404);
      if (emprestimo.status !== "ativo") {
        throw new AppError("Este empréstimo já foi devolvido", 409);
      }

      await emprestimo.update(
        { status: "devolvido", dataDevolucao: new Date() },
        { transaction }
      );

      await LivroRepository.atualizar(
        emprestimo.livroId,
        { disponivel: true },
        { transaction }
      );
    });

    return this.buscarPorId(id);
  }
}

module.exports = new EmprestimoService();
