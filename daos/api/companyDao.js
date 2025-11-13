const con = require('../../config/dbconfig')
const {queryAction} = require('../../helpers/queryAction')

const companyDao = {
    table: 'production', //* table is called production but I went with Company for everything

    findMoviesByProduction: (res, table, production) => {
        const sql = `
            SELECT m.*, p.production
            FROM movie m
            JOIN production p ON m.production_id = p.production_id
            WHERE p.production_id = ?;`

        con.execute(sql, [production], (err, rows) => {
            queryAction(res, err, rows, 'movie')
        })
    }
}

module.exports = companyDao
