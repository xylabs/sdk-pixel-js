import axios from 'axios'

import UserEvent from './UserEvent'

const apiBaseUri: Record<string, string> = {
  beta: 'https://beta.api.coinapp.co',
  local: 'http://localhost:3030/dev',
  prod: 'https://api.coinapp.co',
}

class PixelApi {
  private endPoint: string

  /* baseUri can either be a preset (prod, beta, local), or a specific uri */
  constructor(baseUri = 'prod') {
    this.endPoint = apiBaseUri[baseUri] ? `${apiBaseUri[baseUri]}/t/event` : baseUri
  }

  public async trackEvents(events: UserEvent[]) {
    return (await axios.post(this.endPoint, events)).data
  }
}

export default PixelApi
