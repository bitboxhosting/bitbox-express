const fs = require('fs')

const addLog = (logFile, content) => {
    // check if logFile exists
    fs.open(logFile, (err, fd) => {
        if (err) {
            fs.writeFileSync(logFile, '')
        }
    })

    const log = `${Math.floor(Date.now()/1000)} -- ${content}`

    fs.appendFileSync(logFile, `${log}\n`)
    console.log(log)
}

module.exports = addLog
