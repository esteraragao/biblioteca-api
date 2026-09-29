const AutorRepository = require("../repositories/AutorRepository");
const LivroRepository = require("../repositories/LivroRepository");
const AppError = require("../errors/AppError");

class AutorService {
  criar(dados = {}) {
    const { nome, email, nacionalidade } = dados;
    return AutorRepository.criar({ nome, email, nacionalidade });
  }

  listar() {
    return AutorRepository.listar({ order: [["id", "ASC"]] });
  }

  async buscarPorId(id) {
    const autor = await AutorRepository.buscarPorId(id);
    if (!autor) throw new AppError("Autor não encontrado", 404);
    return autor;
  }

  async atualizar(id, dados = {}) {
    const campos = {};
    if (dados.nome !== undefined) campos.nome = dados.nome;
    if (dados.email !== undefined) campos.email = dados.email;
    if (dados.nacionalidade !== undefined) campos.nacionalidade = dados.nacionalidade;

    const autor = await AutorRepository.atualizar(id, campos);
    if (!autor) throw new AppError("Autor não encontrado", 404);
    return autor;
  }

  async excluir(id) {
    await this.buscarPorId(id);

    const quantidadeLivros = await LivroRepository.contarPorAutor(id);
    if (quantidadeLivros > 0) {
      throw new AppError("Não é possível excluir um autor que possui livros cadastrados", 409);
    }

    await AutorRepository.excluir(id);
  }
}

module.exports = new AutorService();
