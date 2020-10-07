const db = require('../utils/database')

const drop = async () => {
    return db.query(`DROP TABLE biblioteca;`)
}

const criarBiblioteca = async () => {

    const consulta = `CREATE TABLE IF NOT EXISTS biblioteca (
        id SERIAL,
        titulo TEXT,
        autor TEXT,
        deletado BOOL DEFAULT FALSE
    )`;

    return db.query(consulta)
}

const addLivro = async (livro) => {
    const consulta = {
        text: `INSERT INTO biblioteca (titulo, autor, deletado) VALUES ($1, $2, $3) RETURNING *;`,
        values: [livro.titulo, livro.autor, livro.deletado]
    }
    return db.query(consulta)
}

const obterLivro = async (id) => {
    const consulta = {
        text: `SELECT * FROM biblioteca WHERE id = $1;`,
        values: [id]
    }
    const resultado = await db.query(consulta)
    return resultado.rows.shift()
}

const obterLivros = async () => {
    const consulta = {
        text: `SELECT * FROM biblioteca;`,
    }
    const resultado = await db.query(consulta)
    return resultado.rows
}

module.exports = { criarBiblioteca, addLivro, obterLivro, obterLivros, drop}