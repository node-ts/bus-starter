import * as uuid from 'uuid'

export type Uuid = string
export const generateUuid = () => uuid.v4()
