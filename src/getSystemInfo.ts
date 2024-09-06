import Bowser from 'bowser'

import type { UserEventSystem } from './Api/index.js'

let systemInfo: UserEventSystem | undefined

export const getSystemInfo = () => {
  try {
    systemInfo = systemInfo || Bowser.getParser(window.navigator.userAgent).getResult()
  } catch (ex) {
    console.log(`getSystemInfo Error: ${ex}`)
  }
  return systemInfo
}
