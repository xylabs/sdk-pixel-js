interface UserEvent {
  cid: string
  create_time?: number
  email?: string
  email_hash?: string
  event?: string
  fields?: Record<string, any>
  host?: string
  pixel?: string
  receive_time?: number
  rid?: string
  uid?: string
  utm?: Record<string, string>[] | Record<string, string[]>
}

export default UserEvent
