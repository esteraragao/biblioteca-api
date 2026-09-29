const CategoriaRepository = require("../repositories/CategoriaRepository");
const AppError = require("../errors/AppError");

class CategoriaService {
  criar(dados = {}) {
    const { nome, descricao } = dados;
    return CategoriaRepository.criar({ nome, descricao });
  }

  listar() {
    return CategoriaRepository.listar({ order: [["id", "ASC"]] });
  }

  async buscarPorId(id) {
    const categoria = await CategoriaRepository.buscarPorId(id);
    if (!categoria) throw new AppError("Categoria não encontrada", 404);
    return categoria;
  }

  async atualizar(id, dados = {}) {
    const campos = {};
    if (dados.nome !== undefined) campos.nome = dados.nome;
    if (dados.descricao !== undefined) campos.descricao = dados.descricao;

    const categoria = await CategoriaRepository.atualizar(id, campos);
    if (!categoria) throw new AppError("Categoria não encontrada", 404);
    return categoria;
  }

  async excluir(id) {
    await this.buscarPorId(id);
    await CategoriaRepository.excluir(id);
  }
}

module.exports = new CategoriaService();
