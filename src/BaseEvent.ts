import XyPixel from './Pixel'

class BaseEvent<T> {
  public name: string
  constructor(name: string) {
    this.name = name
  }

  async send(pixel: XyPixel, fields: T, email?: string) {
    await pixel.track(this.name, fields, email)
  }
}

export default BaseEvent
