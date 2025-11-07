//TODO Step 1: Import/export your files!!! 
//? Similar setup to what we did in the sever.js file
const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 8064

//TODO Step 2: Creating the Root Route(Homepage in a way)
//? http://localhost:8064/api 
router.get('/api', (req, res)=> {
    //* This res.send is just for us to test to see if our sever is working. It is not needed but I am keeping in here for future notes
    // res.send('Movie api')

    res.json({
        'All Movies': `http://localhost:${PORT}/api/movie` //! best to name the link after what the name of the table you have. In this case, we are starting with the "MOVIE" table.
    })
}) 

//! This is the import file for movieRoutes
router.use('/api/movie', require('./api/movieRoutes'))

//TODO Step 3: Building an ERROR page 
//? This is a temporary way to design a 404 page as we have not created and designed an actual one just yet. However later on we should be able to 
router.use((req, res, next)=> {
    res.status(404)
    res.send('<h1>This is a 404 ERROR PAGE. There are issues and complications ahead for now. Please turn back.</h1>')
})


//! This must always be at the bottom as we are exporting this file! 
module.exports = router