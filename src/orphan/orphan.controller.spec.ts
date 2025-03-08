import { Test, TestingModule } from '@nestjs/testing';
import { OrphanController } from './orphan.controller';

describe('OrphanController', () => {
  let controller: OrphanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrphanController],
    }).compile();

    controller = module.get<OrphanController>(OrphanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
