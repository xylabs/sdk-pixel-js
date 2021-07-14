import UserEventSystem from './UserEventSystem'

interface UserEvent {
  cid: string
  create_time?: number
  email?: string
  email_hash?: string
  event?: string
  fields?: Record<string, unknown>
  host?: string
  pixel?: string
  receive_time?: number
  rid?: string
  uid?: string
  utm?: Record<string, string>[] | Record<string, string[]>
  system?: UserEventSystem
}

export default UserEvent
