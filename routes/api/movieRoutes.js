//TODO Step 1: Gotta setup as usual
const express = require('express')
const router = express.Router()

//! What we are doing here is pulling movieDao information and calling it "dao". Anytime we type Dao, we are talking about the movieDao.js file. We will be having more files similar to this. This is called "destructuring"
const {movieDao: dao} = require('../../daos/dao')

//? http://localhost:8064/api/movie 
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table) //* Translation: movie.findAll requesting a response of the movie table. 
})
//? http://localhost:8064/api/movie/sort you can sort like title, runtime, yr_released and such.
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

//? http://localhost:8064/api/movie/:id  Id needs to be at the bottom instead because if sort is at the bottom, it would try to sort by id and we don't want that. Also instead of listing the word ID you would choose a number
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

//! Don't forget to export! 
module.exports = router

