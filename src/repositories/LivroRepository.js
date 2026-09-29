const { Op } = require("sequelize");
const BaseRepository = require("./BaseRepository");
const { Livro, Autor, Categoria } = require("../models");

const RELACOES_PADRAO = [
  { model: Autor, attributes: ["id", "nome"] },
  {
    model: Categoria,
    as: "categorias",
    attributes: ["id", "nome"],
    through: { attributes: [] },
  },
];

class LivroRepository extends BaseRepository {
  constructor() {
    super(Livro);
  }

  buscarPorId(id, opcoes = {}) {
    return super.buscarPorId(id, { include: RELACOES_PADRAO, ...opcoes });
  }

  // Monta o "where" a partir dos filtros e aplica paginação (limit/offset) quando informada.
  buscarComFiltros({ titulo, ano, disponivel } = {}, { limit, offset } = {}) {
    const condicoes = {};
    if (titulo) condicoes.titulo = { [Op.like]: `%${titulo}%` };
    if (ano !== undefined) condicoes.ano = ano;
    if (disponivel !== undefined) condicoes.disponivel = disponivel;

    return this.model.findAndCountAll({
      where: condicoes,
      include: RELACOES_PADRAO,
      order: [["id", "ASC"]],
      limit,
      offset,
      distinct: true, // evita contar linhas duplicadas geradas pelo JOIN N:N
    });
  }

  contarPorAutor(autorId) {
    return this.model.count({ where: { autorId } });
  }
}

module.exports = new LivroRepository();