import { StartSirenTest, SirenTestFailed, SirenTestPassed, SirenTestStarted } from '../messages'
import { BusInstance, handlerFor } from '@node-ts/bus-core'
import { Uuid } from '../messages/uuid'
import { bus } from '../bus'

const MAX_SIREN_TEST_DURATION = 1000
const TEST_FAILURE_THRESHOLD = 0.5

export const startSirenTestHandler = handlerFor(
  StartSirenTest,
  async ({ sirenId }) => {
    console.log('StartSirenTest command received, starting siren test...', { sirenId })
    setTimeout(async () => testSiren(bus(), sirenId), MAX_SIREN_TEST_DURATION)
    await bus().publish(new SirenTestStarted(sirenId))
  }
)

async function testSiren (bus: BusInstance, sirenId: Uuid): Promise<void> {
  const testFailed = Math.random() > TEST_FAILURE_THRESHOLD
  console.log('Siren test completed, publishing event', { sirenId, testFailed })
  if (testFailed) {
    await bus.publish(new SirenTestFailed(sirenId))
  } else {
    await bus.publish(new SirenTestPassed(sirenId))
  }
}
