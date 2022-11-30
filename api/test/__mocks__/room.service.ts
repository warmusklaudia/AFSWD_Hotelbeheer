import { createRoom } from 'src/rooms/stubs/room.stub'

export const RoomsService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(createRoom()),
  findAll: jest.fn().mockResolvedValue([createRoom()]),
  findOne: jest.fn().mockResolvedValue(createRoom()),
  update: jest.fn().mockResolvedValue(createRoom()),
  remove: jest.fn().mockResolvedValue({ affected: 1 }),
})
