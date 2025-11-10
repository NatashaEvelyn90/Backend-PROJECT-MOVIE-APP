const con = require('../../config/dbconfig')
const { queryAction} = require('../../helpers/queryAction')

const streamDao = {
    table: 'streaming_platform', //? Make sure whenever you are creating your daos, this table has to match the table you are looking/working on.

    findAll: (res, table) => {
        const sql = `SELECT * FROM ${table};`

        con.execute(sql, (err, rows) => {
            queryAction(res, err, rows, table)
        })
    },

    findMoviesByStreamer: (res, table, stream) => {
        const sql = `
            SELECT m.*, s.streaming_platform
            FROM movie m
            JOIN movie_to_streaming ms ON m.movie_id = ms.movie_id
            JOIN streaming_platform s ON ms.streaming_platform_id =s.streaming_platform_id
            WHERE s.streaming_platform = ?;`

        con.execute(sql, [stream], (err, rows) => {
            queryAction(res, err, rows, table)
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
};

module.exports = streamDao
