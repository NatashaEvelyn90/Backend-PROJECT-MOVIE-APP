const con = require('../../config/dbconfig')
const {queryAction} = require('../../helpers/queryAction')

const genreDao = {
    table: 'genre',

    findAll: (res, table) => {
        const sql = `SELECT * FROM ${table};`

        con.execute(sql, (err, rows) => {
            queryAction(res, err, rows, table)
        })
    },

    findMoviesByGenre: (res, table, id) => {
        const sql = `
            SELECT m.*, g.genre
            FROM movie m
            JOIN movie_to_${table} USING (movie_id)
            JOIN ${table} g USING (${table}_id)
            WHERE g.${table}_id = ?;`

        con.execute(sql, [id], (err, rows) => {
            queryAction(res, err, rows, 'movie')
        })
    },

    sort: (res, table, sorter) => {
        const sql = `SELECT * FROM ${table} ORDER BY ${sorter};`

        con.execute(sql, (err, rows) => {
                queryAction(res, err, rows, table)
        })
    },

    findById: (res, table, id) => {
        const sql = `SELECT * FROM ${table} WHERE ${table}_id = ?;`

        con.execute(sql, [id], (err, rows) => {
                queryAction(res, err, rows, table)
        })
    }
}

module.exports = genreDao