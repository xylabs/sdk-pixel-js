interface UserEventSystem {
  userAgent?: string
  is?: {
    bot?: boolean
    mobileBot?: boolean
    desktopMode?: boolean
    tv?: boolean
    webKit?: boolean
    console?: boolean
    watch?: boolean
  }
  mobile?: string
  phone?: string
  tablet?: string
  os?: string
  userAgents?: string[]
  versions?: Record<string, string>
}

export default UserEventSystem
