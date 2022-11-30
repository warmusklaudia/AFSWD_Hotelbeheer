import { Test, TestingModule } from '@nestjs/testing';
import { PricingResolver } from './pricing.resolver';
import { PricingService } from './pricing.service';

describe('PricingResolver', () => {
  let resolver: PricingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PricingResolver, PricingService],
    }).compile();

    resolver = module.get<PricingResolver>(PricingResolver);
  });

  it.todo('should be defined');
});
