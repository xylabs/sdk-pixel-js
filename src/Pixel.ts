import { Mutex } from 'async-mutex'
import md5 from 'md5'

import { PixelApi, UserEvent } from './Api'
import Referrer from './Referrer'
import UniqueUserId from './UniqueUserId'
import UtmFields from './UtmFields'

class XyPixel {
  public pixelId?: string
  private api?: PixelApi
  public email?: string
  public email_hash?: string | null
  public queue: UserEvent[] = []
  public cid = new UniqueUserId().id
  private queueMutex = new Mutex()

  public constructor(pixelId: string, api?: PixelApi) {
    this.api = api
    this.pixelId = pixelId
  }

  public identify(email?: string) {
    this.email = email
    this.email_hash = email ? md5(email) : undefined
  }

  private async tryFlushQueue() {
    await this.queueMutex.runExclusive(async () => {
      if (this.queue.length === 0) return
      const api = this.api
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

  public async track(event: string, fields?: Record<string, any>, email?: string) {
    const utm = XyPixel.utmFields.update()
    const referrer = new Referrer()
    //if a new email is passed, update it
    if (this.email != email) {
      this.email = email
      this.email_hash = email ? md5(email) : undefined
    }
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
}

export default XyPixel
