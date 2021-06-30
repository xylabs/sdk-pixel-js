import { assertEx } from '@xyo-network/sdk-xyo-js'
import { Mutex } from 'async-mutex'
import md5 from 'md5'

import { PixelApi, UserEvent } from './Api'
import Referrer from './Referrer'
import UniqueUserId from './UniqueUserId'
import UtmFields from './UtmFields'

class XyPixel {
  public pixelId?: string
  public email?: string
  public email_hash?: string | null
  public queue: UserEvent[] = []
  public cid = new UniqueUserId().id
  private queueMutex = new Mutex()

  private constructor(pixelId: string) {
    this.pixelId = pixelId
  }

  public identify(email?: string) {
    this.email = email
    this.email_hash = email ? md5(email) : undefined
  }

  private async tryFlushQueue() {
    await this.queueMutex.runExclusive(async () => {
      if (this.queue.length === 0) return
      const api = XyPixel.api
      if (api) {
        const events = this.queue
        this.queue = []
        try {
          await api.trackEvents(events)
        } catch (ex) {
          if (events) {
            //put it back since it failed
            this.queue = this.queue.concat(events)
          }
          console.error(ex)
        }
      }
    })
  }

  private static utmFields = new UtmFields()

  public async send<T extends Record<string, unknown>>(event: string, fields?: T) {
    const utm = XyPixel.utmFields.update()
    const referrer = new Referrer()
    this.queue.push({
      ...{
        cid: this.cid,
        create_time: Date.now(),
        email_hash: this.email_hash ?? undefined,
        event,
        fields,
        host: document.location.host,
        pixel: this.pixelId,
        referrer: referrer.toJson(),
        utm,
      },
    })
    await this.tryFlushQueue()
  }

  private static _instance?: XyPixel
  public static get instance(): XyPixel {
    return assertEx(this._instance, 'XyPixel uninitialized')
  }

  public static init(pixelId: string) {
    this._instance = new XyPixel(pixelId)
    return this._instance
  }

  private static api = new PixelApi()
  public static selectApi(api: PixelApi) {
    this.api = api
  }
}

export default XyPixel
