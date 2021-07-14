import MobileDetect from 'mobile-detect'

import { UserEventSystem } from './Api'

let md: MobileDetect | undefined = undefined
let systemInfo: UserEventSystem | undefined = undefined

const versionSources = [
  'Mobile',
  'Build',
  'Version',
  'VendorID',
  'iPad',
  'iPhone',
  'iPod',
  'Kindle',
  'Chrome',
  'Coast',
  'Dolfin',
  'Firefox',
  'Fennec',
  'Edge',
  'IE',
  'NetFront',
  'NokiaBrowser',
  'Opera',
  'Opera Mini',
  'Opera Mobi',
  'UCBrowser',
  'MQQBrowser',
  'MicroMessenger',
  'baiduboxapp',
  'baidubrowser',
  'SamsungBrowser',
  'Iron',
  'Safari',
  'Skyfire',
  'Tizen',
  'Webkit',
  'PaleMoon',
  'SailfishBrowser',
  'Gecko',
  'Trident',
  'Presto',
  'Goanna',
  'iOS',
  'Android',
  'Sailfish',
  'BlackBerry',
  'BREW',
  'Java',
  'Windows Phone OS',
  'Windows Phone',
  'Windows CE',
  'Windows NT',
  'Symbian',
  'webOS',
]

const isSources = ['bot', 'console', 'desktopMode', 'mobileBot', 'tv', 'watch', 'webKit']

const getVersions = () => {
  const versions: Record<string, string> = {}
  let returnable = false
  md = md || new MobileDetect(window.navigator.userAgent)
  versionSources.forEach((versionSource) => {
    const version = md?.versionStr(versionSource)
    if (version) {
      versions[versionSource.replace(' ', '_')] = version
      returnable = true
    }
  })
  return returnable ? versions : undefined
}

const getIs = () => {
  const is: Record<string, boolean> = {}
  let returnable = false
  md = md || new MobileDetect(window.navigator.userAgent)
  isSources.forEach((isSource) => {
    const isResult = md?.is(isSource)
    if (isResult) {
      is[isSource] = isResult
      returnable = true
    }
  })
  return returnable ? is : undefined
}

const getSystemInfo = () => {
  try {
    md = md || new MobileDetect(window.navigator.userAgent)
    systemInfo = systemInfo || {
      is: getIs(),
      mobile: md.mobile() ?? undefined,
      os: md.os(),
      phone: md.phone() ?? undefined,
      tablet: md.tablet() ?? undefined,
      userAgent: window.navigator.userAgent,
      userAgents: md.userAgents(),
      versions: getVersions(),
    }
  } catch (ex) {
    console.log(`getSystemInfo Error: ${ex}`)
  }
  return systemInfo
}

export default getSystemInfo
