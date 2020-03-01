import { Container } from 'inversify'
import { BusModule } from '@node-ts/bus-core'
import { LoggerModule } from '@node-ts/logger-core'
import { WinstonModule } from '@node-ts/logger-winston'
import { HandlersModule } from './handlers/handlers-module'
import { BusWorkflowModule } from '@node-ts/bus-workflow'
import {
  BUS_RABBITMQ_SYMBOLS,
  BusRabbitMqModule,
  RabbitMqTransportConfiguration
} from '@node-ts/bus-rabbitmq'

const rabbitConfiguration: RabbitMqTransportConfiguration = {
  queueName: 'accounts-application-queue',
  connectionString: 'amqp://guest:guest@localhost'
}

export const container = new Container()
container.load(new LoggerModule())
container.load(new BusModule())
container.load(new BusRabbitMqModule())
container.load(new WinstonModule())
container.load(new BusWorkflowModule())
container.load(new HandlersModule())

container
  .bind(BUS_RABBITMQ_SYMBOLS.TransportConfiguration)
  .toConstantValue(rabbitConfiguration)
