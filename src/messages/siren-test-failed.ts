import { Event } from '@node-ts/bus-messages'
import { Uuid } from './uuid'

export class SirenTestFailed extends Event {

  static readonly NAME = 'bus-starter/siren-test-failed'
  readonly $name = SirenTestFailed.NAME
  readonly $version = 0

  /**
   * A siren was tested but a problem was found. This siren is considered broken and requires maintenance.
   * @param sirenId Identifies the problem siren
   */
  constructor (
    readonly sirenId: Uuid
  ) {
    super()
  }

}
