import { WorkflowState } from '@node-ts/bus-core'
import { Uuid } from '../messages/uuid'

export class SirenTestWorkflowData extends WorkflowState {
  $name = 'bus-starter/siren-test-data'

  sirenId: Uuid
  maintenanceEmailSent: boolean
}
