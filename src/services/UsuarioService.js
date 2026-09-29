const UsuarioRepository = require("../repositories/UsuarioRepository");
const AppError = require("../errors/AppError");

class UsuarioService {
  criar(dados = {}) {
    const { nome, email } = dados;
    return UsuarioRepository.criar({ nome, email });
  }

  listar() {
    return UsuarioRepository.listar({ order: [["id", "ASC"]] });
  }

  async buscarPorId(id) {
    const usuario = await UsuarioRepository.buscarPorId(id);
    if (!usuario) throw new AppError("Usuário não encontrado", 404);
    return usuario;
  }
}

module.exports = new UsuarioService();
