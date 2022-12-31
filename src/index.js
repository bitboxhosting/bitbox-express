const express = require('express')
const app = express()

// load env vars
require('dotenv').config()

// load routes from routes.js
require('./routes')(app)

// start the app
app.listen(process.env.PORT ?? 3000, () => {
    console.log(`App started on port ${process.env.PORT ?? 3000}`)
})
