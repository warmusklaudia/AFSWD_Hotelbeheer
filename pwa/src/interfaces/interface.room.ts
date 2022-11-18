import { Reservation } from './interface.reservation'

export default interface Room {
  id: string
  name: string
  description: string
  reservation?: Reservation
  rating: number
  category: string
  location: string
  accessCode: string
  createdAt?: Date
  updatedAt?: Date
}
