import { User } from './interface.user'

export interface Reservation {
  id: string
  userId: string
  user: User
  amountAdults: number
  amountChildren: number
  price: number
  reservationStartDate: Date
  reservationEndDate: Date
  createdAt?: Date
  updatedAt?: Date
}
