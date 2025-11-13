const con = require('../../config/dbconfig')
const {queryAction} = require('../../helpers/queryAction')

const genreDao = {
    table: 'genre',

    findMoviesByGenre: (res, table, genre) => {
        const sql = `
            SELECT m.*, g.genre
            FROM movie m
            JOIN movie_to_genre mg ON m.movie_id = mg.movie_id
            JOIN genre g ON mg.genre_id = g.genre_id
            WHERE g.genre = ?;`

        con.execute(sql, [genre], (err, rows) => {
            queryAction(res, err, rows, 'movie')
        })
    }
}

module.exports = genreDao