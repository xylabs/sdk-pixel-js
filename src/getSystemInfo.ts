import Bowser from 'bowser'

import { UserEventSystem } from './Api'

let systemInfo: UserEventSystem | undefined = undefined

const getSystemInfo = () => {
  try {
    systemInfo = systemInfo || Bowser.parse(window.navigator.userAgent)
  } catch (ex) {
    console.log(`getSystemInfo Error: ${ex}`)
  }
  return systemInfo
}

export default getSystemInfo
