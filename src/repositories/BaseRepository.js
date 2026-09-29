class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  criar(dados, opcoes = {}) {
    return this.model.create(dados, opcoes);
  }

  listar(opcoes = {}) {
    return this.model.findAll(opcoes);
  }

  buscarPorId(id, opcoes = {}) {
    return this.model.findByPk(id, opcoes);
  }

  async atualizar(id, dados, opcoes = {}) {
    const registro = await this.model.findByPk(id, opcoes);
    if (!registro) return null;
    return registro.update(dados, opcoes);
  }

  excluir(id, opcoes = {}) {
    return this.model.destroy({ where: { id }, ...opcoes });
  }
}

module.exports = BaseRepository;
