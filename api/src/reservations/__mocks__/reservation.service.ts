import { createReservation } from 'src/reservations/stubs/reservation.stub'

export const RoomsService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(createReservation()),
  findAll: jest.fn().mockResolvedValue([createReservation()]),
  findOne: jest.fn().mockResolvedValue(createReservation()),
  update: jest.fn().mockResolvedValue(createReservation()),
  remove: jest.fn().mockResolvedValue({ affected: 1 }),
})
