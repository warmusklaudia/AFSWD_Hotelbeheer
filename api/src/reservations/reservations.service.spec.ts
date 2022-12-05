import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CleaningService } from '../cleaning/cleaning.service'
import { Cleaning } from '../cleaning/entities/cleaning.entity'
import { Reservation } from './entities/reservation.entity'
import { ReservationsService } from './reservations.service'
import { createReservation } from './stubs/reservation.stub'

describe('ReservationsService', () => {
  let service: ReservationsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: getRepositoryToken(Reservation),
          useValue: {
            save: jest.fn().mockResolvedValue(createReservation()),
            find: jest.fn().mockResolvedValue([createReservation()]),
            findOne: jest.fn().mockResolvedValue(createReservation()),
            delete: jest.fn(),
          },
        },
        // {
        //   provide: getRepositoryToken(Cleaning),
        //   useValue: {
        //   },
        // },
      ],
    }).compile()

    service = module.get<ReservationsService>(ReservationsService)
  })

  it.todo('should be defined')
})
