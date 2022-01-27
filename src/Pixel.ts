import { assertEx } from '@xylabs/sdk-js'
import { Mutex } from 'async-mutex'
import Cookies from 'js-cookie'
import md5 from 'md5'

import { PixelApi, UserEvent } from './Api'
import ExIds from './ExIds'
import getSystemInfo from './getSystemInfo'
import Referrer from './Referrer'
import UniqueUserId from './UniqueUserId'
import UtmFields from './UtmFields'

const emailHashLocalStorageName = 'xy_email_hash'

export class XyPixel {
  public pixelId?: string
  public email?: string
  public email_hash?: string | null
  public queue: UserEvent[] = []
  public cid = new UniqueUserId().id
  public exids?: ExIds
  private queueMutex = new Mutex()

  private constructor(pixelId: string) {
    this.pixelId = pixelId
    this.email_hash = localStorage.getItem(emailHashLocalStorageName)
  }

  public identify(email?: string) {
    this.email = email
    this.email_hash = email ? md5(email) : undefined
    if (this.email_hash) {
      localStorage.setItem(emailHashLocalStorageName, this.email_hash)
    }
  }

  private updateFbId() {
    this.exids = {
      ...{
        fbc: Cookies.get('_fbc'),
        fbp: Cookies.get('_fbp'),
        ga: Cookies.get('_ga'),
        gclid: Cookies.get('_gclid'),
        rdt_uid: Cookies.get('rdt_uid'),
        scid: Cookies.get('_scid'),
        tt_sessionId: sessionStorage.getItem('tt_sessionId') ?? undefined,
      },
    }
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

  private static utmFieldsObj: UtmFields
  private static utmFields = () => {
    if (XyPixel.utmFieldsObj === undefined) {
      XyPixel.utmFieldsObj = new UtmFields()
    }
    return XyPixel.utmFieldsObj
  }

  public async send<T extends Record<string, unknown>>(event: string, fields?: T) {
    this.updateFbId()
    const utm = XyPixel.utmFields().update()
    const referrer = new Referrer()
    this.queue.push({
      ...{
        cid: this.cid,
        create_time: Date.now(),
        email_hash: this.email_hash ?? undefined,
        event,
        exids: this.exids,
        fields,
        host: document.location.host,
        pathname: document.location.pathname,
        pixel: this.pixelId,
        referrer: referrer.toJson(),
        system: getSystemInfo(),
        utm,
      },
    })
    console.log(`Queue: ${JSON.stringify(this.queue, null, 2)}`)
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

  public static api = new PixelApi()
  public static selectApi(api: PixelApi) {
    this.api = api
  }
}
