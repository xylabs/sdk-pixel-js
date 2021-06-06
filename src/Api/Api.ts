import axios from 'axios'

import UserEvent from './UserEvent'

class PixelApi {
  private pixelId: string
  public constructor(pixelId: string) {
    this.pixelId = pixelId
  }

  public async trackEvents(events: UserEvent[]) {
    return (await axios.post('https://api.coinapp.co/t/event', events)).data
  }
}

export default PixelApi
