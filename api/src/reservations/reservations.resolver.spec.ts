import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsResolver } from './reservations.resolver';
import { ReservationsService } from './reservations.service';

describe('ReservationsResolver', () => {
  let resolver: ReservationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationsResolver, ReservationsService],
    }).compile();

    resolver = module.get<ReservationsResolver>(ReservationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
