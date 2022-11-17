import { Test, TestingModule } from '@nestjs/testing';
import { RequestedServicesService } from './requested-services.service';

describe('RequestedServicesService', () => {
  let service: RequestedServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestedServicesService],
    }).compile();

    service = module.get<RequestedServicesService>(RequestedServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
