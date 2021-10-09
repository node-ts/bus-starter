import 'reflect-metadata'

import { Bus, BusInstance } from '@node-ts/bus-core'
import { generateUuid } from './messages/uuid'

import { StartSirenTest } from './messages'
import { startSirenTestHandler, emailMaintenanceTeamHandler } from './handlers'
import { SirenTestWorkflow } from './workflows'
import { RabbitMqTransportConfiguration, RabbitMqTransport } from '@node-ts/bus-rabbitmq'

const rabbitMqConfiguration: RabbitMqTransportConfiguration = {
  queueName: '@node-ts/bus-starter-test',
  connectionString: 'amqp://guest:guest@0.0.0.0',
  maxRetries: 10
}

const rabbitMq = new RabbitMqTransport(rabbitMqConfiguration)

let bus: BusInstance
async function initialize (): Promise<void> {
  bus = await Bus.configure()
    .withWorkflow(SirenTestWorkflow)
    .withHandler(startSirenTestHandler(() => bus)) // Late bound so it's available at runtime
    .withHandler(emailMaintenanceTeamHandler(() =>bus))
    .withTransport(rabbitMq)
    .initialize()

  await bus.start()
}

async function runDemo (): Promise<void> {
  await bus.send(new StartSirenTest(generateUuid()))
}

initialize()
  .then(runDemo)
  .catch(err => {
    console.log(err)
  })
