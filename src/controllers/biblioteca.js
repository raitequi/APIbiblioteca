// const fs = require('fs');
// const util = require('util');
const biblioteca = require('../repositories/biblioteca')

// const escreverArquivo = util.promisify(fs.writeFile);
// const lerArquivo = util.promisify(fs.readFile);

// const livros = [
// 	{
// 		id: '1',
// 		titulo: 'Senhor dos Aneis, Volume I',
// 		autor: 'Tolkien',
// 		deletado: false,
// 	},
// 	{
// 		id: '2',
// 		titulo: 'Mistborn - Nascidos da Bruma',
// 		autor: 'Brandon Sanderson',
// 		deletado: false,
// 	},
// 	{
// 		id: '3',
// 		titulo: 'Arquivos de Dresden - Frente de Tormenta',
// 		autor: 'Jim Butcher',
// 		deletado: false,
// 	},
// 	{
// 		id: '4',
// 		titulo: 'Arquivos de Dresden - Lua Cheia',
// 		autor: 'Jim Butcher',
// 		deletado: false,
// 	},
// ];

const obterLivros = async (ctx) => {

	// await biblioteca.drop() //DROP TABLE
	// await biblioteca.criarBiblioteca()

	const { autor = null, deletado = false } = ctx.query;
	const estado = deletado === 'true';

	// const arquivoLivros = await lerArquivo('livros.json');
	// const arquivoLivrosJSON = JSON.parse(arquivoLivros);

	const livros = await biblioteca.obterLivros()
	if (!autor) {
		ctx.body = livros.filter(
			(livro) => livro.deletado === estado
		);
		return;
	}

	ctx.body = livros.filter(
		(livro) => livro.deletado === estado && livro.autor === autor
	);
};

const obterLivro = async (ctx) => {
	const { id = null } = ctx.params;

	if (!id) {
		ctx.status = 400;
		ctx.body = { mensagem: 'Pedido mal formatado' };
	}

	// const arquivoLivros = await lerArquivo('livros.json');
	// const arquivoLivrosJSON = JSON.parse(arquivoLivros);
	// const livro = livros.find((item) => item.id === id);

	const livros = await biblioteca.obterLivro(id)

	if (livro) {
		ctx.body = { livro };
		return;
	}

	ctx.status = 404;
	ctx.body = { livro: null };
};

const adicionarLivro = async (ctx) => {

	await biblioteca.criarBiblioteca();

	const { titulo = null, autor = null } = ctx.request.body;
	if (!titulo || !autor) {
		ctx.status = 400;
		ctx.body = { mensagem: 'Pedido mal formatado' };
	}

	// const arquivoLivros = await lerArquivo('livros.json');
	// const arquivoLivrosJSON = JSON.parse(arquivoLivros);
	const novoLivro = { titulo, autor, deletado: false };
	// arquivoLivrosJSON.push(novoLivro);

	console.log(await biblioteca.addLivro(novoLivro))

	// await escreverArquivo('livros.json', JSON.stringify(livros, null, 2));

	ctx.status = 201;
	ctx.body = novoLivro;
};

module.exports = { obterLivros, obterLivro, adicionarLivro };
