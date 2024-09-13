import type { CommonFields } from './CommonFields.js'

export interface UserClickFields extends CommonFields {
  elementName: string
  elementType: string
  intent?: string
  placement?: string
}
