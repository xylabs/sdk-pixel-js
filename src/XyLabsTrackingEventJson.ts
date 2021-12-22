export interface XyLabsTrackingEventJson {
  cid: string
  create_time?: number
  email?: string
  email_hash?: string
  event?: string
  exids?: Record<string, string>
  fields?: Record<string, unknown>
  host?: string
  pathname?: string
  pixel?: string
  receive_time?: number
  rid?: string
  uid?: string
  utm?: Record<string, string>[] | Record<string, string[]>
  system?: unknown
  ip?: string
  ua?: string
}
