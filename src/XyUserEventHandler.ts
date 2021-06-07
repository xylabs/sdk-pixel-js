import FunnelStartedFields from './FunnelStartedFields'
import XyPixel from './Pixel'
import TestStartedFields from './TestStartedFields'
import UserClickFields from './UserClickFields'
import UserEventHandler from './UserEventHandler'
import ViewContentFields from './ViewContentFields'

class XyUserEventHandler<T> extends UserEventHandler<T> {
  private pixel: XyPixel
  constructor(pixel: XyPixel) {
    super()
    this.pixel = pixel
  }
  public async testStarted(fields: T | TestStartedFields) {
    return await this.pixel.track('TestStarted', fields)
  }
  public async funnelStarted(fields: T | FunnelStartedFields) {
    return await this.pixel.track('FunnelStarted', fields)
  }
  public async viewContent(fields: T | ViewContentFields) {
    return await this.pixel.track('ViewContent', fields)
  }
  public async userClick(fields: T | UserClickFields) {
    return await this.pixel.track('ViewPage', fields)
  }
}

export default XyUserEventHandler
