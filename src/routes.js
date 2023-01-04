const multer = require('multer')
const path = require('path')
const randomstring = require('randomstring')
const fs = require('fs')

// configure multer, used for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let rand = randomstring.generate(parseInt(process.env.RAND_LENGTH) ?? 7)
        const fileSize = parseInt(req.headers["content-length"])

        if (fileSize > parseInt(process.env.MAX_SIZE)) {
            cb(null, '/var/empty')
        } else {
            fs.mkdirSync(path.join(__dirname, `/../public/uploads/${rand}`))
            cb(null, path.join(__dirname, `/../public/uploads/${rand}`))
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: parseInt(process.env.MAX_SIZE) ?? 536870912 }
})

// routes
module.exports = function (app) {
    app.post('/upload', upload.single('files'), (req, res) => {
        if (!req.file) {
            return res.json({ error: 'no files specified' })
        }

        let file = req.file.path.replace(/^.*(?=\/uploads\/)/, '')

        res.json(file)
    })
}
