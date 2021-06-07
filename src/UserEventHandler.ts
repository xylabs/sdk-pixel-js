import FunnelStartedFields from './FunnelStartedFields'
import TestStartedFields from './TestStartedFields'
import UserClickFields from './UserClickFields'
import ViewContentFields from './ViewContentFields'

abstract class UserEventHandler<T> {
  abstract testStarted(fields: T | TestStartedFields): Promise<void>
  abstract funnelStarted(fields: T | FunnelStartedFields): Promise<void>
  abstract viewContent(fields: T | ViewContentFields): Promise<void>
  abstract userClick(fields: T | UserClickFields): Promise<void>
}

export default UserEventHandler
