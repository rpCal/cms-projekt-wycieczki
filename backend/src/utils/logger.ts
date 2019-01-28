import { createLogger, format, transports } from 'winston';

const simpleColoredFormat = format.combine(
    format.colorize(),
    format.simple(),
);

let logger = createLogger({
    format: simpleColoredFormat,
    transports: [ new transports.Console() ],
    exitOnError: false
});

export default logger;