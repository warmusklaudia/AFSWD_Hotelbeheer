import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ReservationsService } from '../reservations/reservations.service'
import { Repository } from 'typeorm'
import { Room } from './entities/room.entity'
import { RoomsService } from './rooms.service'
import { createRoomInputStub, createRoom } from './stubs/room.stub'
import { Reservation } from '../reservations/entities/reservation.entity'
import { createReservation } from '../reservations/stubs/reservation.stub'

describe('RoomsService', () => {
  let service: RoomsService
  let mockRoomRepository: Repository<Room>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        ReservationsService,
        {
          provide: getRepositoryToken(Room),
          useValue: {
            save: jest.fn().mockResolvedValue(createRoom()),
            find: jest.fn().mockResolvedValue([createRoom()]),
            findOne: jest.fn().mockResolvedValue(createRoom()),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Reservation),
          useValue: {
            save: jest.fn().mockResolvedValue(createReservation()),
            find: jest.fn().mockResolvedValue([createReservation()]),
            findOne: jest.fn().mockResolvedValue(createReservation()),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<RoomsService>(RoomsService)
    mockRoomRepository = module.get<Repository<Room>>(getRepositoryToken(Room))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('when create is called', () => {
    it('should call the repository save method', async () => {
      const saveSpy = jest.spyOn(mockRoomRepository, 'save')
      const newRoom = new Room()
      await service.create(newRoom)
      expect(saveSpy).toBeCalledTimes(1)
    })

    it('should be called with the correct params', async () => {
      const saveSpy = jest.spyOn(mockRoomRepository, 'save')
      const newRoom = createRoomInputStub()
      await service.create(newRoom)
      expect(saveSpy).toBeCalledWith(newRoom)
    })

    it('should return the created room', async () => {
      const newRoom = createRoomInputStub()
      const toReturnedRoom = createRoom()

      const result = await service.create(newRoom)
      expect(result).toEqual(toReturnedRoom)
    })
  })
})
