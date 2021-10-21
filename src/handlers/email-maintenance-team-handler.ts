import { handlerFor } from '@node-ts/bus-core'
import { EmailMaintenanceTeam } from '../messages'
import * as emailService from '../services/email-service'

export const emailMaintenanceTeamHandler = handlerFor(
  EmailMaintenanceTeam,
  async ({ message, sirenId }) => emailService.sendEmail(message, sirenId)
)
