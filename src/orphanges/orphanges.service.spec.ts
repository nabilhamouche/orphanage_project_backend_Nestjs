import { Test, TestingModule } from '@nestjs/testing';
import { OrphangesService } from './orphanges.service';

describe('OrphangesService', () => {
  let service: OrphangesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrphangesService],
    }).compile();

    service = module.get<OrphangesService>(OrphangesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
