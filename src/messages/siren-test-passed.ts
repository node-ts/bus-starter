import { Event } from '@node-ts/bus-messages'
import { Uuid } from './uuid'

export class SirenTestPassed extends Event {

  static readonly NAME = 'bus-starter/siren-test-passed'
  readonly $name = SirenTestPassed.NAME
  readonly $version = 0

  /**
   * A siren was tested and found to be functioning correctly
   * @param sirenId Identifies the siren that was tested
   */
  constructor (
    readonly sirenId: Uuid
  ) {
    super()
  }

}
