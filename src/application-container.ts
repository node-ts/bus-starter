import { Container } from 'inversify'
import { BusModule } from '@node-ts/bus-core'
import { LoggerModule } from '@node-ts/logger-core'
import { WinstonModule } from '@node-ts/logger-winston'
import { HandlersModule } from './handlers/handlers-module'
import { BusWorkflowModule } from '@node-ts/bus-workflow'

export class ApplicationContainer extends Container {
  constructor () {
    super()
    this.load(
      new LoggerModule(),
      new WinstonModule(),
      new BusModule(),
      new BusWorkflowModule(),
      new HandlersModule()
    )
  }
}
