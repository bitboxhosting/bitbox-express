const fs = require('fs')

const addLog = (logFile, content) => {
    // check if logFile exists
    fs.open(logFile, (err, fd) => {
        if (err) {
            fs.writeFileSync(logFile, '')
        }
    })

    fs.appendFileSync(logFile, `${content}\n`)
    console.log(content)
}

module.exports = addLog
