//TODO Step 1: Connecting to the data/table 
const con = require('../../config/dbconfig')

const movieDao = {
    table: 'movie',

    findMovieInfo: (res, table)=> {
        
        const sql = `SELECT m.movie_id, m.title, m.rating, m.yr_released, m.production_id 
        CASE WHEN
            `
    }
}

module.exports = movieDao