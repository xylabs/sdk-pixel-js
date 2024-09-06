import type { CommonFields } from './CommonFields.js'

export interface PurchaseFields extends CommonFields {
  id: string
  name?: string
  price?: number
  value?: number
}
