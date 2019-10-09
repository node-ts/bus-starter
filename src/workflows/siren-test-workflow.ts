import { Workflow, StartedBy, Handles } from '@node-ts/bus-workflow'
import { SirenTestWorkflowData } from './sirent-test-workflow-data'
import { SirenTestStarted, SirenTestFailed, SirenTestPassed, EmailMaintenanceTeam, MaintenanceTeamEmailed } from '../messages'
import { inject } from 'inversify'
import { BUS_SYMBOLS, Bus } from '@node-ts/bus-core'

export class SirenTestWorkflow extends Workflow<SirenTestWorkflowData> {

  constructor (
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus
  ) {
    super()
  }

  @StartedBy<SirenTestStarted, SirenTestWorkflowData, 'handlesSirenTestStarted'>(SirenTestStarted)
  handlesSirenTestStarted ({ sirenId }: SirenTestStarted): Partial<SirenTestWorkflowData> {
    return {
      sirenId
    }
  }

  @Handles<SirenTestFailed, SirenTestWorkflowData, 'handlesSirenTestFailed'>(
    SirenTestFailed,
    event => event.sirenId,
    'sirenId'
  )
  async handlesSirenTestFailed ({ sirenId }: SirenTestFailed): Promise<Partial<SirenTestWorkflowData>> {
    const emailMaintenanceTeam = new EmailMaintenanceTeam(
      'A siren has failed its test and requires maintenance',
      sirenId
    )
    await this.bus.send(emailMaintenanceTeam)
    return {}
  }

  @Handles<SirenTestPassed, SirenTestWorkflowData, 'handlesSirenTestPassed'>(
    SirenTestPassed,
    event => event.sirenId,
    'sirenId'
  )
  async handlesSirenTestPassed (_: SirenTestPassed): Promise<Partial<SirenTestWorkflowData>> {
    return this.complete()
  }

  @Handles<MaintenanceTeamEmailed, SirenTestWorkflowData, 'handlesMaintenanceTeamEmailed'>(
    MaintenanceTeamEmailed,
    event => event.sirenId,
    'sirenId'
  )
  async handlesMaintenanceTeamEmailed (_: MaintenanceTeamEmailed): Promise<Partial<SirenTestWorkflowData>> {
    return this.complete({
      maintenanceEmailSent: true
    })
  }

}
