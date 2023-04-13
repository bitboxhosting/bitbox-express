const express = require('express')
const https = require('https')
const fs = require('fs')
const path = require('path')
const app = express()

// load env vars
require('dotenv').config()

// make public dir available
app.use(express.static('public'))

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*'])
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.append('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

// load routes from routes.js
require('./routes')(app)

// start the app
if ((process.env.SERVER_TYPE == 'https')) {
    https
        .createServer(
            {
                key: fs.readFileSync(
                    path.join(__dirname, '/../server/server.key')
                ),
                cert: fs.readFileSync(
                    path.join(__dirname, '/../server/server.cert')
                )
            },
            app
        )
        .listen(process.env.PORT ?? 3000, () => {
            console.log(`App started on port ${process.env.PORT ?? 3000} (https)`)
        })
} else {
    app.listen(process.env.PORT ?? 3000, () => {
        console.log(`App started on port ${process.env.PORT ?? 3000}`)
    })
}
