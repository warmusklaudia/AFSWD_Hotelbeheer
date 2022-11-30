import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from "@nestjs/typeorm";
import { RequestedService } from "./entities/requested-service.entity";
import { RequestedServicesService } from './requested-services.service';

describe('RequestedServicesService', () => {
  let service: RequestedServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestedServicesService,
        {
          provide: getRepositoryToken(RequestedService),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<RequestedServicesService>(RequestedServicesService);
  });

 it.todo('should be defined')
});
