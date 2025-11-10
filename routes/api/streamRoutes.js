const router = require('express').Router()

const {streamDao: dao} = require('../../daos/dao')

//? http://localhost:8064/api/platform = show full list of streaming platforms
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table) 
})

// //? http://localhost:8064/api/stream/movies/:stream = search movies by typing in the platform
router.get('/stream/:stream', (req, res)=> {
    dao.findMoviesByStreamer(res, dao.table, req.params.stream)
})

// //? http://localhost:8064/api/stream/sort = sort by streaming_platform (abc order) or streaming_platform_id 
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

// //? http://localhost:8064/api/stream/:id  = sort by id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router 