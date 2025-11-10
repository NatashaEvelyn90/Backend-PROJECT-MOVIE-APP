const con = require('../../config/dbconfig')
const {queryAction} = require('../../helpers/queryAction')

const companyDao = {
    table: 'production', //* table is called production but I went with Company for everything

    findAll: (res, table) => {
        const sql = `SELECT * FROM ${table};`

        con.execute(sql, (err, rows) => {
            queryAction(res, err, rows, table)
        })
    },

    findMoviesByProduction: (res, table, production) => {
        const sql = `
            SELECT m.*, p.production
            FROM movie m
            JOIN production p ON m.production_id = p.production_id
            WHERE p.production_id = ?;`

        con.execute(sql, [production], (err, rows) => {
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
        const sql = `
        SELECT * FROM ${table} WHERE ${table}_id = ?;`

        con.execute(sql, [id], (err, rows) => {
            queryAction(res, err, rows, table)
        })
    }
}

module.exports = companyDao
