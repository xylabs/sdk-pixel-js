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

const getVersions = () => {
  const versions: Record<string, string> = {}
  md = md || new MobileDetect(window.navigator.userAgent)
  versionSources.forEach((versionSource) => {
    const version = md?.versionStr(versionSource)
    if (version) {
      versions[version.replace(' ', '_')] = version
    }
  })
  return versions
}

const getSystemInfo = () => {
  try {
    md = md || new MobileDetect(window.navigator.userAgent)
    systemInfo = systemInfo || {
      is: {
        bot: md.is('bot'),
        console: md.is('console'),
        desktopMode: md.is('desktopMode'),
        mobileBot: md.is('mobileBot'),
        tv: md.is('tv'),
        watch: md.is('watch'),
        webKit: md.is('webKit'),
      },
      mobile: md.mobile() ?? undefined,
      os: md.os(),
      phone: md.phone() ?? undefined,
      tablet: md.tablet() ?? undefined,
      userAgents: md.userAgents(),
      versions: getVersions(),
    }
  } catch (ex) {
    console.log(`getSystemInfo Error: ${ex}`)
  }
  return systemInfo
}

export default getSystemInfo
