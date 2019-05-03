import { Event } from '@node-ts/bus-messages'
import { Uuid } from './uuid'

export class SirenTestStarted extends Event {

  static readonly NAME = 'bus-started/siren-test-started'
  readonly $name = SirenTestStarted.NAME
  readonly $version = 0

  /**
   * A siren test has started to see if a siren is operating normally
   * @param sirenId Identifies the siren being tested
   */
  constructor (
    readonly sirenId: Uuid
  ) {
    super()
  }

}
