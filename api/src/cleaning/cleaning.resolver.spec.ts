import { Test, TestingModule } from '@nestjs/testing';
import { CleaningResolver } from './cleaning.resolver';
import { CleaningService } from './cleaning.service';

describe('CleaningResolver', () => {
  let resolver: CleaningResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CleaningResolver, CleaningService],
    }).compile();

    resolver = module.get<CleaningResolver>(CleaningResolver);
  });

  it.todo('should be defined');
});
