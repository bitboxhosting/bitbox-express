const multer = require('multer')
const path = require('path')
const randomstring = require('randomstring')
const fs = require('fs')

// configure multer, used for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let rand = randomstring.generate(process.env.RAND_LENGTH ?? 7)
        fs.mkdirSync(path.join(__dirname, `/../public/uploads/${rand}`))
        cb(null, path.join(__dirname, `/../public/uploads/${rand}`))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

module.exports = function (app) {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/../public/views/upload.html'))
    })

    app.post('/upload', upload.any('files'), (req, res) => {
        let files = []
        
        req.files.forEach(element => {
            files.push(element.path.replace(/^.*(?=\/uploads\/)/, ""))
        });

        res.json(files)
    })
}
