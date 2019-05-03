import { Event } from '@node-ts/bus-messages'
import { Uuid } from './uuid'

export class MaintenanceTeamEmailed extends Event {

  static readonly NAME = 'bus-starter/maintenance-team-emailed'
  readonly $name = MaintenanceTeamEmailed.NAME
  readonly $version = 0

  /**
   * The maintenance team has been contacted to go and repair a siren
   * @param sirenId The siren that will be repaired
   */
  constructor (
    readonly sirenId: Uuid
  ) {
    super()
  }

}
