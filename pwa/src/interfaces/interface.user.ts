import { Role } from './interface.role'

export interface User {
  id?: string
  uid: string
  amountCredits: number
  breakfastCode: string
  role: Role
  createdAt?: Date
  updatedAt?: Date
}
