import { FunnelStartedFields } from './FunnelStartedFields'
import { XyPixel } from './Pixel'
import { TestStartedFields } from './TestStartedFields'
import { UserClickFields } from './UserClickFields'
import { UserEventHandler } from './UserEventHandler'
import { ViewContentFields } from './ViewContentFields'

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
