const Router = require('koa-router');
const biblioteca = require('./controllers/biblioteca');

const router = new Router();

/**
 * Definição de rotas
 */
router.get('/livros', biblioteca.obterLivros);
router.get('/livros/:id', biblioteca.obterLivro);
router.post('/addlivros', biblioteca.adicionarLivro);

module.exports = router;
