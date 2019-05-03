import { injectable } from 'inversify'
import { WinstonConfiguration } from '@node-ts/logger-winston'
import { format, transports, LoggerOptions } from 'winston'

const consoleTransport = new transports.Console({
  handleExceptions: true
})

@injectable()
export class LoggerConfiguration implements WinstonConfiguration {
  getConfiguration (loggerName: string): LoggerOptions {
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
      defaultMeta: { loggerName },
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
