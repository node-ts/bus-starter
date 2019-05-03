import { ContainerModule } from 'inversify'
import { bindLogger } from '@node-ts/logger-core'
import { StartSirenTestHandler } from './start-siren-test-handler'
import { EmailMaintenanceTeamHandler } from './email-maintenance-team-handler'

export class HandlersModule extends ContainerModule {

  constructor () {
    super(bind => {
      bindLogger(bind, StartSirenTestHandler)
      bindLogger(bind, EmailMaintenanceTeamHandler)
    })
  }

}
