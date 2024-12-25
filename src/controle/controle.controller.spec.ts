import { Test, TestingModule } from '@nestjs/testing';
import { ControleController } from './controle.controller';

describe('ControleController', () => {
  let controller: ControleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControleController],
    }).compile();

    controller = module.get<ControleController>(ControleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
