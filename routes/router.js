const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 8064

//! add your stylesheet
router.use(express.static ('public'))

//? http://localhost:8064 - Homepage
router.get('/', (req, res)=> {
    res.render('pages/home', {
        title: 'The Movie Forms',
        name: "Crazpicc's Movie Form App!"       
    })
}) 

const forms = [
    'Movie', 'Director', 'Actor', 'Genre', 'Company'
]

//? http://localhost:8064/${forms}-form -Different Form Page routes
forms.forEach(forms => {
    router.get(`/${forms}-form`, (req, res)=> {
        res.render(`pages/form/${forms}-form`, {
            title: `${forms} Form`,
            name: `${forms} Form`
        })
    }) 
})


//? http://localhost:8064/api 
router.get('/api', (req, res)=> {

    res.json({
        'All Movies': `http://localhost:${PORT}/api/movie`, 
        'All Directors': `http://localhost:${PORT}/api/director`,
        'All Actors': `http://localhost:${PORT}/api/actor`,
        'All Genres': `http://localhost:${PORT}/api/genre`,
        'All Companies': `http://localhost:${PORT}/api/company`,
        'All Streaming': `http://localhost:${PORT}/api/stream`
    })
}) 

const endpoints = [
    'movie', 'director', 'actor', 'genre', 'company', 'stream'
]

endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})


//! error page  
router.use((req, res, next)=> {
    res.status(404)
    .render('pages/error', {
        title: 'ERROR PAGE',
        name: 'Error'
    })
})

module.exports = router



//* Crazpicc's Notes for Router.js
// #region

