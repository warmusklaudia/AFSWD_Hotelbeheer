import { CreateReservationInput } from '../dto/create-reservation.input'
import { Reservation } from '../entities/reservation.entity'
import { ObjectId } from 'mongodb'
import { Room } from '../../rooms/entities/room.entity'
export const createReservationInputStub = (): CreateReservationInput => {
  const r = new CreateReservationInput()

  r.amountAdults = 2
  r.amountChildren = 0
  r.price = 0
  r.reservationStartDate = new Date()
  r.reservationEndDate = new Date()
  r.userId = '6384bd4926a01d1ff4bef99d'

  return r
}

export const createReservation = (): Reservation => {
  const r = new Room()

  r.id = new ObjectId('637f8f441569b77268921f43')
  r.name = 'Nienna Suite'
  r.description = 'De Nienna suite is onze standaard suite.'
  r.rating = 4
  r.category = 'standard'
  r.location = 'other'
  r.accessCode = '1234'

  const rs = new Reservation()

  rs.id = new ObjectId('d89a0bA4cc619d347024f42e')
  rs.amountAdults = 2
  rs.amountChildren = 0
  rs.price = 0
  rs.reservationStartDate = new Date()
  rs.reservationEndDate = new Date()
  rs.userId = '6384bd4926a01d1ff4bef99d'
  rs.amountRooms = 1
  rs.rooms = [r]

  return rs
}
