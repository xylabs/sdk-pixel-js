import { FunnelStartedFields } from './FunnelStartedFields'
import { TestStartedFields } from './TestStartedFields'
import { UserClickFields } from './UserClickFields'
import { ViewContentFields } from './ViewContentFields'

export abstract class UserEventHandler<T> {
  abstract funnelStarted(fields: T | FunnelStartedFields): Promise<void>
  abstract testStarted(fields: T | TestStartedFields): Promise<void>
  abstract userClick(fields: T | UserClickFields): Promise<void>
  abstract viewContent(fields: T | ViewContentFields): Promise<void>
}
