import type { EmptyObject } from '@xylabs/object'

import type { FunnelStartedFields } from './FunnelStartedFields.js'
import type { TestStartedFields } from './TestStartedFields.js'
import type { UserClickFields } from './UserClickFields.js'
import type { ViewContentFields } from './ViewContentFields.js'

export abstract class UserEventHandler<TData extends EmptyObject> {
  abstract funnelStarted<T extends TData>(fields: T | FunnelStartedFields): Promise<void>
  abstract testStarted<T extends TData>(fields: T | TestStartedFields): Promise<void>
  abstract userClick<T extends TData>(fields: T | UserClickFields): Promise<void>
  abstract viewContent<T extends TData>(fields: T | ViewContentFields): Promise<void>
}
