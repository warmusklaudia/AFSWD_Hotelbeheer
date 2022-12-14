import { Test, TestingModule } from '@nestjs/testing'
import { ObjectId } from 'mongodb'
import { ReservationsService } from '../reservations/reservations.service'
import {
  ClientMessage,
  MessageTypes,
} from '../bootstrap/entities/ClientMessage'
import { createUser } from '../users/stubs/user.stub'
import { UsersService } from '../users/users.service'
import { CreateRoomInput } from './dto/create-room.input'
import { Room } from './entities/room.entity'
import { RoomsResolver } from './rooms.resolver'
import { RoomsService } from './rooms.service'
import { createRoom, createRoomInputStub } from './stubs/room.stub'

jest.mock('./rooms.service')
jest.mock('../reservations/reservations.service')

describe('RoomsResolver', () => {
  let resolver: RoomsResolver
  let service: RoomsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsResolver,
        RoomsService,
        ReservationsService,
        {
          provide: UsersService,
          useValue: {
            findOneByUid: jest.fn().mockResolvedValue(createUser()),
          },
        },
      ],
    }).compile()

    resolver = module.get<RoomsResolver>(RoomsResolver)
    service = module.get<RoomsService>(RoomsService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createRoom', () => {
    let createRoomDTO: CreateRoomInput
    let resultRoom: Room

    beforeEach(async () => {
      createRoomDTO = createRoomInputStub()
      resultRoom = await resolver.createRoom(createRoomDTO)
    })

    describe('when createRoom is called', () => {
      it('should call the service create method', async () => {
        expect(service.create).toBeCalledTimes(1)
      })
      it('should return the created room', async () => {
        //result of the resolver is equal to the result of the mocked service
        expect(resultRoom).toEqual(createRoom())
      })
    })
  })

  describe('findAll', () => {
    let result: Room[]

    beforeEach(async () => {
      result = await resolver.findAll()
    })

    describe('When this function is called.', () => {
      it('Should call RoomsService.findAll', () => {
        expect(service.findAll).toBeCalledTimes(1)
      })

      it('Should return some (or one) room(s).', () => {
        expect(result).toEqual([createRoom()])
      })
    })
  })

  describe('findOne', () => {
    let result: Room

    beforeEach(async () => {
      //@ts-ignore
      result = await resolver.findOne(createRoom().id)
    })

    describe('Check service findOne implementation', () => {
      it('Should call birdService correct.', () => {
        expect(service.findOne).toBeCalledTimes(1)
        expect(service.findOne).toBeCalledWith(createRoom().id)
      })

      it('Should return the created bird.', () => {
        expect(result).toEqual(createRoom())
      })
    })
  })

  describe('findRoomsWithoutReservation', () => {
    let result: Room[]

    beforeEach(async () => {
      result = await resolver.findRoomsWithoutReservation()
    })

    describe('When findRoomsWithoutReservation is called.', () => {
      it('Should call RoomsService.findRoomsWithoutReservation', () => {
        expect(service.findRoomsWithoutReservation).toBeCalledTimes(1)
      })

      it('Should return some (or one) room(s).', () => {
        expect(result).toEqual([createRoom()])
      })
    })
  })

  describe('findByString', () => {
    let result: Room[]
    let searchString: string
    let categoryString: string

    beforeEach(async () => {
      searchString = 'Nienna Suite'
      categoryString = 'standard'
      result = await resolver.findByName(searchString, categoryString)
    })

    describe('When findByString is called.', () => {
      it('Should call RoomsService.findByString', () => {
        expect(service.findByString).toBeCalledTimes(1)
        expect(service.findByString).toBeCalledWith(
          searchString,
          categoryString,
        )
      })

      it('Should return some (or one) room(s).', () => {
        expect(result).toEqual([createRoom()])
      })
    })
  })

  describe('removeReservationFromRoom', () => {
    let result: Room
    let roomId: string

    beforeEach(async () => {
      //@ts-ignore
      roomId = createRoom().id
      result = await resolver.removeReservationFromRoom(roomId)
    })

    describe('When removeReservationFromRoom is called.', () => {
      it('Should call RoomsService.removeReservationFromRoom', () => {
        expect(service.removeReservationFromRoom).toBeCalledTimes(1)
        expect(service.removeReservationFromRoom).toBeCalledWith(roomId)
      })

      it('Should return the room without the reservation.', () => {
        expect(result).toEqual(createRoom())
      })
    })
  })

  describe('addReservationToRoom', () => {
    let result: Room
    let roomId: string
    let reservationId: string

    beforeEach(async () => {
      //@ts-ignore
      roomId = createRoom().id
      reservationId = new ObjectId().toHexString()
      result = await resolver.addReservationToRoom(roomId, reservationId)
    })

    describe('When addReservationToRoom is called.', () => {
      it('Should call RoomsService.addReservationToRoom', () => {
        expect(service.addReservationToRoom).toBeCalledTimes(1)
        expect(service.addReservationToRoom).toBeCalledWith(
          roomId,
          reservationId,
        )
      })

      it('Should return the room with the reservation.', () => {
        expect(result).toEqual(createRoom())
      })
    })
  })

  describe('update', () => {
    let resultRoom: Room
    beforeEach(async () => {
      //@ts-ignore
      resultRoom = await resolver.updateRoom(createRoom())
    })

    it('when update is called', () => {
      expect(service.update).toBeCalledTimes(1)
    })

    it('should call roomsservice update with the correct params', async () => {
      expect(service.update).toBeCalledWith(createRoom())
    })

    it('should return the updated room', async () => {
      expect(resultRoom).toEqual(createRoom())
    })
  })

  describe('remove', () => {
    let result: ClientMessage

    beforeEach(async () => {
      //@ts-ignore
      result = await resolver.removeRoom(createRoom().id)
    })

    describe('Check the service implementation', () => {
      it('Is the remove function called correctly?', () => {
        expect(service.remove).toBeCalledTimes(1)
        expect(service.remove).toBeCalledWith(createRoom().id)
      })
    })

    describe('Check the GraphQL return', () => {
      it('Is the message clear to the frontend?', async () => {
        const expectResult: ClientMessage = {
          type: MessageTypes.success,
          statusCode: 200,
          message: 'Room deleted',
          //@ts-ignore
          id: new ObjectId('637f8f441569b77268921f43'),
        }

        expect(result).toEqual(expectResult)
      })

      it('Is the error message shown when something goes wrong?', async () => {
        jest
          .spyOn(service, 'remove')
          .mockResolvedValue({ affected: 1000, raw: '' })

        //@ts-ignore
        result = await resolver.removeRoom(createRoom().id)

        const expectResult: ClientMessage = {
          type: MessageTypes.error,
          statusCode: 400,
          message: 'Delete action went wrong.',
        }

        expect(result).toEqual(expectResult)
      })
    })
  })
})
