import axios from 'axios'

import UserEvent from './UserEvent'

class PixelApi {
  private endPoint: string

  constructor(baseUri = 'https://api.coinapp.co') {
    this.endPoint = `${baseUri}/t/event`
  }

  public async trackEvents(events: UserEvent[]) {
    return (await axios.post(this.endPoint, events)).data
  }
}

export default PixelApi
