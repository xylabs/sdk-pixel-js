import type { FunnelStartedFields } from './FunnelStartedFields.js'
import type { TestStartedFields } from './TestStartedFields.js'
import type { UserClickFields } from './UserClickFields.js'
import type { ViewContentFields } from './ViewContentFields.js'

export abstract class UserEventHandler<T> {
  abstract funnelStarted(fields: T | FunnelStartedFields): Promise<void>
  abstract testStarted(fields: T | TestStartedFields): Promise<void>
  abstract userClick(fields: T | UserClickFields): Promise<void>
  abstract viewContent(fields: T | ViewContentFields): Promise<void>
}
