const con = require('../../config/dbconfig')
const { queryAction} = require('../../helpers/queryAction')

const actorDao = {
    table: 'actor',

    findAll: (res, table)=> {
        con.execute(`SELECT * FROM ${table}`, (err, rows) =>
        queryAction(res, err, rows, table)
        );
    },
    
    findActorMovies:(res, table, id)=> {
    const sql = `
        SELECT m.*, a.first_name, a.last_name
        FROM movie m
        JOIN movie_to_${table} USING (movie_id)
        JOIN ${table} a USING (${table}_id)
        WHERE a.${table}_id = ?;`;

    con.execute(sql, [id], (err, rows) =>
        queryAction(res, err, rows, table)
        );
    },

    sort:(res, table, sorter)=> {
    con.execute(`SELECT * FROM ${table} ORDER BY ${sorter}`, (err, rows) =>
        queryAction(res, err, rows, table)
        );
    },

    findById:(res, table, id)=> {
    con.execute(`SELECT * FROM ${table} WHERE ${table}_id = ?`, [id], (err, rows) =>
        queryAction(res, err, rows, table)
        );
    },
}

module.exports = actorDao