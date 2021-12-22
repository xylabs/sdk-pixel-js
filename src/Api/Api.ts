import axios from 'axios'

import UserEvent from './UserEvent'

const apiBaseUri: Record<string, string> = {
  beta: 'https://pixel.xylabs.com',
  local: 'http://localhost:3030',
  prod: 'https://pixel.xylabs.com',
}

class PixelApi {
  private endPoint: string

  /* baseUri can either be a preset (prod, beta, local), or a specific uri */
  constructor(baseUri = 'prod') {
    this.endPoint = apiBaseUri[baseUri] ? `${apiBaseUri[baseUri]}/t/event/queue` : baseUri
  }

  public async trackEvents(events: UserEvent[]) {
    return (await axios.post(this.endPoint, events)).data
  }
}

export default PixelApi
