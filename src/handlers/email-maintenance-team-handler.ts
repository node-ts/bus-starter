import { handlerFor, BusInstance } from '@node-ts/bus-core'
import { EmailMaintenanceTeam, MaintenanceTeamEmailed } from '../messages'

export const emailMaintenanceTeamHandler = (bus: () => BusInstance) => handlerFor(
  EmailMaintenanceTeam,
  async ({ message, sirenId }) => {
    console.log('Sending email to maintenance team to fix siren', { message, sirenId })

    // Send the email
    const maintenanceTeamEmailed = new MaintenanceTeamEmailed(sirenId)
    await bus().publish(maintenanceTeamEmailed)
  }
)
