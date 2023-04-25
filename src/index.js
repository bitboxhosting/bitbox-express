const express = require('express')
const https = require('https')
const fs = require('fs')
const compression = require('compression')
const path = require('path')
const app = express()
const rateLimit = require('express-rate-limit')
const config = require('../config.json')

// make public dir available
app.use(express.static('public'))

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*'])
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.append('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(compression())

app.set('trust proxy', true)

const limiter = rateLimit({
	windowMs: config.limiterconf.minutes * 60 * 1000,
	max: config.limiterconf.max,
	standardHeaders: true,
	legacyHeaders: false
})

app.use('/upload', limiter)

// load routes from routes.js
require('./routes')(app)

// start the app
if (config.serverconf.https == true) {
    https
        .createServer(
            {
                key: fs.readFileSync(
                    path.join(__dirname, '/../server/server.key')
                ),
                cert: fs.readFileSync(
                    path.join(__dirname, '/../server/server.cert')
                ),
            },
            app
        )
        .listen(config.serverconf.port, () => {
            console.log(
                `App started on port ${config.serverconf.port} (https)`
            )
        })
} else {
    app.listen(config.serverconf.port, () => {
        console.log(`App started on port ${config.serverconf.port}`)
    })
}
