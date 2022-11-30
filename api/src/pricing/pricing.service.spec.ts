import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { PricingService } from './pricing.service'

describe('PricingService', () => {
  let service: PricingService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PricingService,
        {
          provide: getRepositoryToken(PricingService),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<PricingService>(PricingService)
  })

  it.todo('should be defined')
})
