import { MaintenanceTeamEmailed, SirenTestFailed, SirenTestStarted } from '../messages'
import { bus, disposeBus, initializeBus } from '../bus'
import { generateUuid } from '../messages/uuid'
import { Listener } from '@node-ts/bus-core'
import { Event } from '@node-ts/bus-messages'
import { resolve } from 'path/posix'

describe('SirenTestWorkflow', () => {

  beforeAll(initializeBus)
  afterAll(disposeBus)

  describe('when a siren test is started', () => {
    const sirenId = generateUuid()
    beforeAll(async () => bus().publish(new SirenTestStarted(sirenId)))

    describe('and then the siren test fails', () => {
      it('should send an email to the maintenance team', async () => {
        const maintenanceEmailReceived = new Promise<void>(resolve => {
          const callback: Listener<{ event: Event }> = ({ event }) => {
            if (event.$name === MaintenanceTeamEmailed.NAME && (event as MaintenanceTeamEmailed).sirenId === sirenId) {
              bus().beforePublish.off(callback)
              resolve()
            }
          }
          bus().beforePublish.on(callback)
        })
        await bus().publish(new SirenTestFailed(sirenId))
        await maintenanceEmailReceived
      })
    })
  })
})
