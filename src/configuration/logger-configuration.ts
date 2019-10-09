import { injectable } from 'inversify'
import { WinstonConfiguration } from '@node-ts/logger-winston'
import { format, transports, LoggerOptions } from 'winston'

const consoleTransport = new transports.Console({
  handleExceptions: true
})

@injectable()
export class LoggerConfiguration implements WinstonConfiguration {

  /**
   * The "winston" logging library prefers a single instance of their logger
   * as creates an event emitter per instance. As such this function returns
   * a generic global configuration, with the metadata of the injection target
   * added via a logger proxy that's internal to `WinstonModule`
   */
  getConfiguration (): LoggerOptions {
    const devFormat = format.printf(({
      level,
      message,
      timestamp,
      ...rest
    }) => {
      const timestampDate = timestamp as Date
      const timetxt = timestampDate.toString()
      const s = `${timetxt} ${level}: ${message}`
      if (Object.keys(rest).length > 0) {
        return `${s} ${JSON.stringify(rest, undefined, 2)}`
      }
      return s
    })

    return {
      transports: [consoleTransport],
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.align(),
        devFormat
      )
    }
  }
}
