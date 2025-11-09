const router = require('express').Router()

const {actorDao: dao} = require('../../daos/dao')

//? http://localhost:8064/api/actor = Full list of Actors
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table) 
})

//? http://localhost:8064/api/actor/movies/:id = put movies/ id of the actor and then it should show what movie they were in
router.get('/movies/:id', (req, res)=> {
    dao.findActorMovies(res, dao.table, req.params.id)
})

//? http://localhost:8064/api/actor/sort = sort by actor_id first_name or last_name. Possible img_url but at this time not yet. If error, 404 error will apppear!
router.get('/sort/:sorter', (req, res, next)=> {
    dao.sort(res, dao.table, req.params.sorter, next)
})

//? http://localhost:8064/api/actor/:id  = search by their actor_id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router 