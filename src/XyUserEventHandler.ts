import { FunnelStartedFields } from './FunnelStartedFields.js'
import { XyPixel } from './Pixel.js'
import { TestStartedFields } from './TestStartedFields.js'
import { UserClickFields } from './UserClickFields.js'
import { UserEventHandler } from './UserEventHandler.js'
import { ViewContentFields } from './ViewContentFields.js'

export class XyUserEventHandler<T extends Record<string, unknown>> extends UserEventHandler<T> {
  constructor() {
    super()
  }

  async funnelStarted(fields: T | FunnelStartedFields) {
    return await XyPixel.instance.send('FunnelStarted', fields)
  }

  async testStarted(fields: T | TestStartedFields) {
    return await XyPixel.instance.send('TestStarted', fields)
  }

  async userClick(fields: T | UserClickFields) {
    return await XyPixel.instance.send('ViewPage', fields)
  }

  async viewContent(fields: T | ViewContentFields) {
    return await XyPixel.instance.send('ViewContent', fields)
  }
}
