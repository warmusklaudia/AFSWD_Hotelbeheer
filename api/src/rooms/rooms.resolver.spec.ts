import { Test, TestingModule } from '@nestjs/testing'
import { ReservationsService } from "../reservations/reservations.service"
import { UsersService } from "../users/users.service"
import { RoomsResolver } from './rooms.resolver'
import { RoomsService } from './rooms.service'

jest.mock('../../test/__mocks__/room.service')
jest.mock('../../test/__mocks__/user.service')
jest.mock('../../test/__mocks__/reservation.service')

describe('RoomsResolver', () => {
  let resolver: RoomsResolver
  let service: RoomsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsResolver,
        RoomsService,
        ReservationsService,
        UsersService
      ],
    }).compile()

    resolver = module.get<RoomsResolver>(RoomsResolver)
    service = module.get<RoomsService>(RoomsService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  //it.todo('should be defined')
})
