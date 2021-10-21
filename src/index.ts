import 'reflect-metadata'

import { generateUuid } from './messages/uuid'
import { StartSirenTest } from './messages'
import { bus, initializeBus } from './bus'

async function runDemo (): Promise<void> {
  await bus().send(new StartSirenTest(generateUuid()))
}

initializeBus()
  .then(runDemo)
  .catch(err => {
    console.log(err)
  })
