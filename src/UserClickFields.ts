import type { CommonFields } from './CommonFields.js'

export interface UserClickFields extends CommonFields {
  elementName: string
  elementType: string
  placement?: string
  intent?: string
}
