import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Service } from './entities/service.entity'
import { ServicesService } from './services.service'

describe('ServicesService', () => {
  let service: ServicesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: getRepositoryToken(Service),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<ServicesService>(ServicesService)
  })

  it.todo('should be defined')
})
