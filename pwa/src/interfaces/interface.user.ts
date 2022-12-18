import { Role } from './interface.role'

export interface User {
  id?: string
  uid: string
  firstName: string
  lastName: string
  amountCredits: number
  imgUrl?: string
  role: Role
  createdAt?: Date
  updatedAt?: Date
}
