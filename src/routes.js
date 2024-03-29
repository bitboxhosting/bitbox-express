const multer = require('multer')
const path = require('path')
const randomstring = require('randomstring')
const fs = require('fs')
const addLog = require('./log.js')
const config = require('../config.json')

// configure multer, used for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let rand = randomstring.generate(config.serverconf.id_length)
        const fileSize = parseInt(req.headers['content-length'])

        if (fileSize > config.serverconf.max_size) {
            fs.mkdirSync(`/tmp/${rand}`)
            cb(null, `/tmp/${rand}`)
        } else {
            fs.mkdirSync(path.join(__dirname, `/../public/uploads/${rand}`))
            cb(null, path.join(__dirname, `/../public/uploads/${rand}`))
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})
const upload = multer({
    storage: storage,
    limits: { fileSize: config.serverconf.max_size },
})

// routes
module.exports = function (app) {
    app.post('/upload', upload.single('files'), (req, res) => {
        if (!req.file) {
            return res.json({ error: 'no files specified' })
        }

        let file = req.file.path.replace(/^.*(?=\/uploads\/)/, '')

        addLog(
            path.join(__dirname, '/../server/uploads.log'),
            `${req.ip} uploaded file ${file}`
        )

        res.json({
            file: file,
            id: file.replace(/^\/[^\/]+\//, '').replace(/\/.*/, ''),
        })
    })

    app.get('/info', (req, res) => {
        return res.json(config.serverinfo)
    })

    app.get('/', (req, res) => {
        return res.sendFile(path.join(__dirname, '/../html/index.html'))
    })

    app.get('/privacy', (req, res) => {
        return res.sendFile(path.join(__dirname, '/../html/privacy.html'))
    })
}
