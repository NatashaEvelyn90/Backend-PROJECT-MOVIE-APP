//TODO Step 1: Connecting to the data/table 
//? Make sure to add your helper file as that is needed here as well 
const con = require('../../config/dbconfig')
const { queryAction} = require('../../helpers/queryAction')

const directorDao = {
    table: 'director',

    findAll: (res, table)=> {
        con.execute(`SELECT * FROM ${table}`, (err, rows) =>
        queryAction(res, err, rows, table)
        );
    },
    
    findDirectorMovies:(res, table, id)=> {
    const sql = `
        SELECT m.*, d.first_name, d.last_name
        FROM movie m
        JOIN movie_to_${table} USING (movie_id)
        JOIN ${table} d USING (${table}_id)
        WHERE d.${table}_id = ?;`;

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

module.exports = directorDao