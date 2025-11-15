//! PLEASE PAY ATTENTION TO THE ORDER OF THE STEPS! 

//TODO STEP 1, we must start up our server
//* the word require means that we are importing the files (these are also node packages) 
const express = require('express')
const server = express()

//TODO STEP 4, make sure you add/import your router file 
const router = require('./routes/router')
const PORT = process.env.PORT || 8064 //! zeros are not allow to be the leading number!

//TODO STEP 3, we are going to be handling security here
const helmet = require('helmet') 
const cors = require('cors')

//! When using helmet, it is strong enough to block alot of CDN's (like Bootstrap). SO you have to configure it in a way for it to let SOME things go by
//? you can google some security policies for more information when it comes to helmet and cors.  
// server.use(helmet())
server.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
    CrossOriginEmbedderPolicy: false,
    directives: {
        "img-src": ["'self'", "https: data"],
        "scriptSrc": ["'self'", "cdn.jsdelivr.net"]
    }
}))

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true}))


//TODO STEP 5 set up a View engine
server.set('view engine', 'ejs') 

//TODO STEP 4.1 Make sure to add this as well
//? localhost:8064 starting hub. This is stating to use the router.js file
server.use('/', router)

//TODO STEP 2, the server must listen to the PORT we created!
//? The server.listen Port is always going to be the last thing at the bottom!
server.listen(PORT, () => console.log(`Its time to go to the movies!`))