const LivroRepository = require("../repositories/LivroRepository");
const AutorRepository = require("../repositories/AutorRepository");
const CategoriaRepository = require("../repositories/CategoriaRepository");
const AppError = require("../errors/AppError");

const LIMITE_MAXIMO = 100;

function inteiroPositivo(valor, nome) {
  const numero = Number(valor);
  if (!Number.isInteger(numero) || numero < 1) {
    throw new AppError(`O parâmetro "${nome}" deve ser um inteiro maior que zero`, 400);
  }
  return numero;
}

function booleano(valor, nome) {
  if (valor === "true" || valor === true) return true;
  if (valor === "false" || valor === false) return false;
  throw new AppError(`O filtro "${nome}" deve ser true ou false`, 400);
}

class LivroService {
  async criar(dados = {}) {
    const { titulo, isbn, ano, disponivel, autorId } = dados;
    await this.garantirAutor(autorId);

    const livro = await LivroRepository.criar({
      titulo,
      isbn,
      ano,
      disponivel,
      autorId,
    });

    return this.buscarPorId(livro.id);
  }

  async listar(query = {}) {
    const filtros = {};

    if (query.titulo !== undefined) filtros.titulo = String(query.titulo);
    if (query.ano !== undefined) filtros.ano = inteiroPositivo(query.ano, "ano");
    if (query.disponivel !== undefined) filtros.disponivel = booleano(query.disponivel, "disponivel");

    const usarPaginacao = query.page !== undefined || query.limit !== undefined;

    if (!usarPaginacao) {
      const resultado = await LivroRepository.buscarComFiltros(filtros);
      return resultado.rows;
    }

    const page = query.page !== undefined ? inteiroPositivo(query.page, "page") : 1;
    const limit = query.limit !== undefined ? inteiroPositivo(query.limit, "limit") : 10;

    if (limit > LIMITE_MAXIMO) {
      throw new AppError(`O parâmetro "limit" pode ser no máximo ${LIMITE_MAXIMO}`, 400);
    }

    const offset = (page - 1) * limit;
    const resultado = await LivroRepository.buscarComFiltros(filtros, { limit, offset });
    const totalPages = Math.ceil(resultado.count / limit);

    return {
      data: resultado.rows,
      pagination: { page, limit, total: resultado.count, totalPages },
    };
  }

  async buscarPorId(id) {
    const livro = await LivroRepository.buscarPorId(id);
    if (!livro) throw new AppError("Livro não encontrado", 404);
    return livro;
  }

  async atualizar(id, dados = {}) {
    await this.buscarPorId(id);

    const campos = {};
    if (dados.titulo !== undefined) campos.titulo = dados.titulo;
    if (dados.isbn !== undefined) campos.isbn = dados.isbn;
    if (dados.ano !== undefined) campos.ano = dados.ano;
    if (dados.disponivel !== undefined) campos.disponivel = dados.disponivel;
    if (dados.autorId !== undefined) {
      await this.garantirAutor(dados.autorId);
      campos.autorId = dados.autorId;
    }

    await LivroRepository.atualizar(id, campos);
    return this.buscarPorId(id);
  }

  async excluir(id) {
    await this.buscarPorId(id);
    await LivroRepository.excluir(id);
  }

  async associarCategoria(livroId, categoriaId) {
    const livro = await this.buscarPorId(livroId);
    const categoria = await CategoriaRepository.buscarPorId(categoriaId);
    if (!categoria) throw new AppError("Categoria não encontrada", 404);

    await livro.addCategorias(categoria);
    return this.buscarPorId(livroId);
  }

  async desassociarCategoria(livroId, categoriaId) {
    const livro = await this.buscarPorId(livroId);
    const categoria = await CategoriaRepository.buscarPorId(categoriaId);
    if (!categoria) throw new AppError("Categoria não encontrada", 404);

    await livro.removeCategorias(categoria);
    return this.buscarPorId(livroId);
  }

  async garantirAutor(autorId) {
    if (autorId === undefined || autorId === null) return;
    const autor = await AutorRepository.buscarPorId(autorId);
    if (!autor) throw new AppError("Autor não encontrado", 404);
  }
}

module.exports = new LivroService();
