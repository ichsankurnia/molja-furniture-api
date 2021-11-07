const { createLogger, format } = require('winston');
const winston = require('winston');
require('winston-daily-rotate-file');
const moment = require('moment-timezone');

const logFormat = format.combine(
	format.timestamp(),
	format.printf(
			info => `${moment().format('YYYY-MM-DD HH:mm:ss:SSS')}|${info.message}`
	)
);


const loggerRotate = new (winston.transports.DailyRotateFile) ({
	filename: `logs/api/${moment().year()}/${moment().format('MMMM')}/log_%DATE%.log`,
	datePattern: 'YYYYMMDD'
});

const logger = createLogger({
	
	level: 'info',
	format: logFormat,
	transports: [
		loggerRotate
	]
});


const logErrRotate = new (winston.transports.DailyRotateFile) ({
	filename: `logs/error/${moment().year()}/${moment().format('MMMM')}/error_%DATE%.log`,
	datePattern: 'YYYYMMDD'
});

const logError = createLogger({
	level: 'info',
	format: logFormat,
	transports: [
		logErrRotate
	]
});


module.exports = {logger, logError}