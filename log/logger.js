var winston = require('winston')
var config = require('../config')
var fileName = config.log.file
var level = config.log.level

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
