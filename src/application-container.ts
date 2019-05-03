import { Container } from 'inversify'
import { BusModule } from '@node-ts/bus-core'
import { LoggerModule } from '@node-ts/logger-core'
import { WinstonModule } from '@node-ts/logger-winston'
import { HandlersModule } from './handlers/handlers-module'

export class ApplicationContainer extends Container {
  constructor () {
    super()
    this.load(
      new LoggerModule(),
      new WinstonModule(),
      new BusModule(),
      new HandlersModule()
    )
  }
}
