var winston = require('winston')
var fileName = process.env.LOG_FILE_NAME
var level = process.env.LOG_LEVEL

var logger = winston.createLogger({
    level: level,
    transports: [
        new(winston.transports.Console)({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ name: 'error', filename: __dirname + 'error.log', level: 'error' }),
        new(winston.transports.File)({
            filename: __dirname + '/' + fileName,
            level: level
        })
    ]
})

module.exports = {
    logger: logger
}
