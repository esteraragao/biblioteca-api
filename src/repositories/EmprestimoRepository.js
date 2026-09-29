const BaseRepository = require("./BaseRepository");
const { Emprestimo, Usuario, Livro } = require("../models");

const RELACOES_PADRAO = [
  { model: Usuario, attributes: ["id", "nome"] },
  { model: Livro, attributes: ["id", "titulo", "disponivel"] },
];

class EmprestimoRepository extends BaseRepository {
  constructor() {
    super(Emprestimo);
  }

  listar(opcoes = {}) {
    return super.listar({
      include: RELACOES_PADRAO,
      order: [["id", "ASC"]],
      ...opcoes,
    });
  }

  buscarPorId(id, opcoes = {}) {
    return super.buscarPorId(id, { include: RELACOES_PADRAO, ...opcoes });
  }
}

module.exports = new EmprestimoRepository();