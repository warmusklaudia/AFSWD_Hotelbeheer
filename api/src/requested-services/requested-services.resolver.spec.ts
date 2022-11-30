import { Test, TestingModule } from '@nestjs/testing'
import { RequestedServicesResolver } from './requested-services.resolver'
import { RequestedServicesService } from './requested-services.service'

describe('RequestedServicesResolver', () => {
  let resolver: RequestedServicesResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestedServicesResolver, RequestedServicesService],
    }).compile()

    resolver = module.get<RequestedServicesResolver>(RequestedServicesResolver)
  })

  it.todo('should be defined')
})
