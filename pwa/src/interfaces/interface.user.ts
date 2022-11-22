import { Role } from './interface.role'

export interface User {
  id?: string
  uid: string
  role: Role
  createdAt?: Date
  updatedAt?: Date
}
