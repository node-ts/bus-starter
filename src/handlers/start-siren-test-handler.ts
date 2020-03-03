import { StartSirenTest, SirenTestFailed, SirenTestPassed, SirenTestStarted } from '../messages'
import { HandlesMessage, BUS_SYMBOLS, Bus } from '@node-ts/bus-core'
import { inject } from 'inversify'
import { LOGGER_SYMBOLS, Logger } from '@node-ts/logger-core'
import { Uuid } from '../messages/uuid'

const MAX_SIREN_TEST_DURATION = 5000
const TEST_FAILURE_THRESHOLD = 0.5

@HandlesMessage(StartSirenTest)
export class StartSirenTestHandler {

  async handle (_: StartSirenTest): Promise<void> {
    throw new Error('Command will be routed to the DLQ after retries are exhausted')
  }

}
