import 'reflect-metadata'

import { ApplicationContainer } from './application-container'
import { BUS_SYMBOLS, Bus, ApplicationBootstrap } from '@node-ts/bus-core'
import { generateUuid } from './messages/uuid'
import { WINSTON_SYMBOLS } from '@node-ts/logger-winston'
import { LoggerConfiguration } from './configuration'

import { StartSirenTest } from './messages'
import { StartSirenTestHandler, EmailMaintenanceTeamHandler } from './handlers'
import { WorkflowRegistry, BUS_WORKFLOW_SYMBOLS } from '@node-ts/bus-workflow'
import { SirenTestWorkflowData, SirenTestWorkflow } from './workflows'

const container = new ApplicationContainer()
container.rebind(WINSTON_SYMBOLS.WinstonConfiguration).to(LoggerConfiguration)

async function initialize (): Promise<void> {
  const workflowRegistry = container.get<WorkflowRegistry>(BUS_WORKFLOW_SYMBOLS.WorkflowRegistry)
  workflowRegistry.register(SirenTestWorkflow, SirenTestWorkflowData)
  await workflowRegistry.initializeWorkflows()

  const bootstrap = container.get<ApplicationBootstrap>(BUS_SYMBOLS.ApplicationBootstrap)
  bootstrap.registerHandler(StartSirenTestHandler)
  bootstrap.registerHandler(EmailMaintenanceTeamHandler)

  await bootstrap.initialize(container)
}

async function runDemo (): Promise<void> {
  const bus = container.get<Bus>(BUS_SYMBOLS.Bus)
  await bus.send(new StartSirenTest(generateUuid()))
}

initialize()
  .then(runDemo)
  .catch(err => {
    console.log(err)
  })
