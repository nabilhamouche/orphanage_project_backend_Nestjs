import { Test, TestingModule } from '@nestjs/testing';
import { OrphangesController } from './orphanges.controller';

describe('OrphangesController', () => {
  let controller: OrphangesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrphangesController],
    }).compile();

    controller = module.get<OrphangesController>(OrphangesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
