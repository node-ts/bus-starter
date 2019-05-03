import { Command } from '@node-ts/bus-messages'
import { Uuid } from './uuid'

export class StartSirenTest extends Command {

  static readonly NAME = 'bus-started/start-siren-test'
  readonly $name = StartSirenTest.NAME
  readonly $version = 0

  /**
   * Instructs a siren to run its test procedure to ensure it's functioning correctly
   * @param Identifies which siren to test
   */
  constructor (
    readonly sirenId: Uuid
  ) {
    super()
  }

}
