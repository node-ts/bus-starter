import { WorkflowData } from '@node-ts/bus-workflow'
import { Uuid } from '../messages/uuid'

export class SirenTestWorkflowData extends WorkflowData {
  $name = 'bus-starter/siren-test-data'

  sirenId: Uuid
}
