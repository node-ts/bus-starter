import { Command } from '@node-ts/bus-messages'
import { Uuid } from './uuid'

export class EmailMaintenanceTeam extends Command {

  static readonly NAME = 'bus-starter/email-maintenance-team'
  readonly $name = EmailMaintenanceTeam.NAME
  readonly $version = 0

  /**
   * Sends an email to the maintenance team to alert them of sirens that need to be fixed
   * @param message The message to send in the email
   * @param sirenId Identifies the siren that requires maintenance
   */
  constructor (
    readonly message: string,
    readonly sirenId: Uuid
  ) {
    super()
  }

}
