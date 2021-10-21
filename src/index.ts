import 'reflect-metadata'

import { Bus, BusInstance, Workflow } from '@node-ts/bus-core'
import { generateUuid } from './messages/uuid'

import { StartSirenTest } from './messages'
import { startSirenTestHandler, emailMaintenanceTeamHandler } from './handlers'
import { SirenTestWorkflow } from './workflows'
import { RabbitMqTransportConfiguration, RabbitMqTransport } from '@node-ts/bus-rabbitmq'
import { Container, decorate, inject, injectable } from 'inversify'

const rabbitMqConfiguration: RabbitMqTransportConfiguration = {
  queueName: '@node-ts/bus-starter-test',
  connectionString: 'amqp://guest:guest@0.0.0.0',
  maxRetries: 10
}

const rabbitMq = new RabbitMqTransport(rabbitMqConfiguration)

// Temporarily adding in a container to fix undefined bus in SirenTestWorkflow
/*

  @node-ts/bus-core:service-bus Message was unsuccessfully handled. Returning to queue {
  message: {
    id: '20f86b65-4831-4231-b3b3-025a42bb6d11',
    domainMessage: SirenTestFailed {
      sirenId: '3d963824-ff8e-43dd-9e09-62cf15dbdff7',
      '$name': 'bus-starter/siren-test-failed',
      '$version': 0
    },
    raw: {
      fields: [Object],
      properties: [Object],
      content: <Buffer 7b 22 73 69 72 65 6e 49 64 22 3a 22 33 64 39 36 33 38 32 34 2d 66 66 38 65 2d 34 33 64 64 2d 39 65 30 39 2d 36 32 63 66 31 35 64 62 64 66 66 37 22 2c ... 53 more bytes>
    },
    attributes: {
      correlationId: '2c7ce8c6-6163-4bda-a525-b3840228b84d',
      attributes: {},
      stickyAttributes: {}
    }
  },
  error: {
    name: 'TypeError',
    message: "Cannot read property 'send' of undefined",
    stack: "TypeError: Cannot read property 'send' of undefined\n" +
      '    at SirenTestWorkflow.handlesSirenTestFailed (/Users/russwatson/projects/clients/bakerstreet/bus-starter/dist/workflows/siren-test-workflow.js:36:24)\n' +
      '    at WorkflowRegistry.dispatchMessageToWorkflow (/Users/russwatson/projects/clients/bakerstreet/bus-starter/node_modules/@node-ts/bus-core/dist/workflow/registry/workflow-registry.js:184:65)\n' +
      '    at /Users/russwatson/projects/clients/bakerstreet/bus-starter/node_modules/@node-ts/bus-core/dist/workflow/registry/workflow-registry.js:143:36\n' +
      '    at Array.map (<anonymous>)\n' +
      '    at /Users/russwatson/projects/clients/bakerstreet/bus-starter/node_modules/@node-ts/bus-core/dist/workflow/registry/workflow-registry.js:140:56'
  }
} +2ms

*/

decorate(injectable(), SirenTestWorkflow);
decorate(inject("bus"), SirenTestWorkflow, 0);
decorate(injectable(), Workflow);

let bus: BusInstance
async function initialize (): Promise<void> {
  const container = new Container();
  bus = await Bus.configure()
    .withContainer(container)
    .withWorkflow(SirenTestWorkflow)
    .withHandler(startSirenTestHandler(() => bus)) // Late bound so it's available at runtime
    .withHandler(emailMaintenanceTeamHandler(() =>bus))
    .withTransport(rabbitMq)
    .initialize()

  container.bind(SirenTestWorkflow).to(SirenTestWorkflow);
  container.bind("bus").toConstantValue(bus);

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
