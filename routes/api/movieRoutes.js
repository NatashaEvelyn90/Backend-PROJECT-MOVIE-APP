//TODO Step 1: Gotta setup as usual
const express = require('express')
const router = express.Router()

//! What we are doing here is pulling movieDao information and calling it "dao". Anytime we type Dao, we are talking about the movieDao.js file. We will be having more files similar to this. 
const {movieDao: dao} = require('../../daos/dao')

router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table) //* Translation: movie.findAll requesting a response of the movie table. 
})


module.exports = router