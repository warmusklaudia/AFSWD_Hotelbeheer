import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ReservationsService } from '../reservations/reservations.service'
import { Repository } from 'typeorm'
import { Room } from './entities/room.entity'
import { RoomsService } from './rooms.service'
import {
  createRoomInputStub,
  createRoom,
  createRoomWithReservation,
} from './stubs/room.stub'
import { Reservation } from '../reservations/entities/reservation.entity'
import { createReservation } from '../reservations/stubs/reservation.stub'
import { ObjectId } from 'mongodb'

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
            findRoomsWithoutReservation: jest
              .fn()
              .mockResolvedValue([createRoom(), createRoomWithReservation()]),
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

  describe('findAll', () => {
    describe('when findAll is called', () => {
      it('should call the repository find method', async () => {
        const findSpy = jest.spyOn(mockRoomRepository, 'find')
        await service.findAll()
        expect(findSpy).toBeCalledTimes(1)
      })

      it('should return the list of rooms', async () => {
        const toReturnedRoom = createRoom()
        const result = await service.findAll()
        expect(result).toEqual([toReturnedRoom])
      })
    })
  })

  describe('findOne', () => {
    describe('when findOne is called', () => {
      it('should call the repository findOne method', async () => {
        const findSpy = jest.spyOn(mockRoomRepository, 'findOne')
        await service.findOne('637f8f441569b77268921f43')
        expect(findSpy).toBeCalledTimes(1)
      })

      it('should be called with the correct params', async () => {
        const findSpy = jest.spyOn(mockRoomRepository, 'findOne')
        await service.findOne('637f8f441569b77268921f43')
        expect(findSpy).toBeCalledWith(new ObjectId('637f8f441569b77268921f43'))
      })

      it('should return a room', async () => {
        const toReturnedRoom = createRoom()
        const result = await service.findOne('637f8f441569b77268921f43')
        expect(result).toEqual(toReturnedRoom)
      })
    })
  })

  describe('findRoomsWithoutReservation', () => {
    describe('when findRoomsWithoutReservation is called', () => {
      it('should call the repository find method', async () => {
        const findSpy = jest.spyOn(mockRoomRepository, 'find')
        await service.findRoomsWithoutReservation()
        expect(findSpy).toBeCalledTimes(1)
      })

      it('should return the list of rooms', async () => {
        const room = createRoom()
        //does not return the mocked repository function
        const result = await service.findRoomsWithoutReservation()
        expect(result).toEqual([room])
      })
    })
  })

  describe('update', () => {
    describe('when update is called', () => {
      it('should call the repository save method', async () => {
        const saveSpy = jest.spyOn(mockRoomRepository, 'save')
        const newRoom = createRoom()
        // @ts-ignore
        await service.update(newRoom)
        expect(saveSpy).toBeCalledTimes(1)
      })

      it('should be called with the correct params', async () => {
        const saveSpy = jest.spyOn(mockRoomRepository, 'save')
        const newRoom = createRoom()
        // @ts-ignore
        await service.update(newRoom)
        expect(saveSpy).toBeCalledWith(newRoom)
      })

      it('should return the updated bird', async () => {
        const newRoom = createRoom()
        const toReturnedRoom = createRoom()
        // @ts-ignore
        const result = await service.update(newRoom)
        expect(result).toEqual(toReturnedRoom)
      })
    })
  })

  describe('remove', () => {
    describe('when remove is called', () => {
      it('should call the repository delete method', async () => {
        const deleteSpy = jest.spyOn(mockRoomRepository, 'delete')
        const newRoom = createRoom()
        // @ts-ignore
        await service.remove(newRoom.id)
        expect(deleteSpy).toBeCalledTimes(1)
      })
    })
  })
})
