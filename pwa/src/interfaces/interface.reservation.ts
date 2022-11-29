import Cleaning from './interface.cleaning'
import { User } from './interface.user'

export interface Reservation {
  id: string
  userId: string
  user: User
  amountRooms: number
  amountAdults: number
  amountChildren: number
  price: number
  reservationStartDate: Date
  reservationEndDate: Date
  cleaning: Cleaning
  createdAt?: Date
  updatedAt?: Date
}
