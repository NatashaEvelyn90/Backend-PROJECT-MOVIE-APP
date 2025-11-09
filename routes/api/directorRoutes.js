//! This is a shortcut way of doing the usual setup! It merges them both together into one!
const router = require('express').Router()

const {directorDao: dao} = require('../../daos/dao')

//? http://localhost:8064/api/director 
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table) 
})

//? http://localhost:8064/api/director/movies/:id 
router.get('/movies/:id', (req, res)=> {
    dao.findDirectorMovies(res, dao.table, req.params.id)
})

//? http://localhost:8064/api/director/sort 
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

//? http://localhost:8064/api/director/:id  
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router 