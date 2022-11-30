import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Reservation } from './entities/reservation.entity'
import { ReservationsService } from './reservations.service'

describe('ReservationsService', () => {
  let service: ReservationsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: getRepositoryToken(Reservation),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<ReservationsService>(ReservationsService)
  })

  it.todo('should be defined')
})
