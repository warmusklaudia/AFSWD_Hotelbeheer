import { Reservation } from './interface.reservation'

export interface Room {
  id: string
  name: string
  description: string
  reservation: Reservation
  reservationId: string
  rating: number
  category: string
  location: string
  accessCode: string
  createdAt?: Date
  updatedAt?: Date
}
